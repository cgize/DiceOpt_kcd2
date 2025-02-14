// simulator.js
const calculateScore = (roll) => {
    const counts = Array(6).fill(0);
    roll.forEach(n => counts[n - 1]++);

    let score = 0;
    const baseScores = [1000, 200, 300, 400, 500, 600];

    // Triples con crecimiento exponencial
    counts.forEach((count, i) => {
        if (count >= 3) score += baseScores[i] * Math.pow(2, count - 3);
    });

    // Escaleras solo si no hay triples
    if (score === 0) {
        if ([1, 2, 3, 4, 5].every(n => counts[n - 1] >= 1)) score += 500;
        if ([2, 3, 4, 5, 6].every(n => counts[n - 1] >= 1)) score += 750;
        if (counts.every(c => c >= 1)) score += 1500;
    }

    // Singles solo si no hay triples ni escaleras
    if (score === 0) {
        score += counts[0] * 100 + counts[4] * 50;
    }

    return score;
};

function getUniqueCombinations(dice, maxSize) {
    // Agrupar dados por tipo especial
    const diceGroups = {
        guaranteed: [...new Set(dice)].filter(d => diceDB[d].some(p => p === 100)),
        tripleMakers: [...new Set(dice)].filter(d => diceDB[d][2] >= 30),
        wildcards: [...new Set(dice)].filter(d => !diceDB[d].some(p => p === 100) && diceDB[d][2] < 30)
    };

    // Generar combinaciones estratégicas
    const baseCombos = [];
    for (let g = 0; g <= Math.min(diceGroups.guaranteed.length, 6); g++) {
        for (let t = 0; t <= diceGroups.tripleMakers.length; t++) {
            const neededWildcards = 6 - g - t;
            if (neededWildcards >= 0 && neededWildcards <= diceGroups.wildcards.length) {
                baseCombos.push([
                    ...diceGroups.guaranteed.slice(0, g),
                    ...diceGroups.tripleMakers.slice(0, t),
                    ...diceGroups.wildcards.slice(0, neededWildcards)
                ]);
            }
        }
    }
    return baseCombos.filter(c => c.length === 6 && c.every(die => dice.includes(die)));
}

const workerCode = `
const diceDB = ${JSON.stringify(diceDB)};
const calculateScore = ${calculateScore.toString()};

const rollDie = (dieName) => {
    const die = diceDB[dieName];
    const maxIndex = die.indexOf(100);
    if (maxIndex !== -1) return maxIndex + 1;
    
    let rand = Math.random() * 100;
    let accum = 0;
    for (let f = 0; f < 6; f++) {
        accum += die[f];
        if (rand <= accum) return f + 1;
    }
    return 6;
};

self.onmessage = (e) => {
    const [combinations, simulations] = e.data;
    const results = [];
    
    for (const combo of combinations) {
        let totalScore = 0;
        const composition = {
            guaranteed: combo.filter(d => diceDB[d].some(p => p === 100)).length,
            triples: combo.filter(d => diceDB[d][2] >= 30).length
        };
        
        for (let i = 0; i < simulations; i++) {
            const roll = combo.map(rollDie);
            totalScore += calculateScore(roll);
        }
        
        results.push({
            combination: combo,
            score: totalScore / simulations,
            composition: composition
        });
    }
    
    postMessage(results);
};
`;

const blob = new Blob([workerCode], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

let finalResults = [];

function startSimulation() {
    if (selectedDice.length < 1) return alert(translations.no_dice_selected);

    const combinations = getUniqueCombinations(selectedDice, 6);
    const progress = document.getElementById('progress');
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = `<h3>${translations.calculating}</h3>`;
    progress.style.width = '0%';
    finalResults = [];

    worker.onmessage = (e) => {
        const chunkResults = e.data;
        finalResults = finalResults.concat(chunkResults);

        const processed = finalResults.length;
        const total = combinations.length;
        progress.style.width = `${(processed / total) * 100}%`;

        if (processed >= total) {
            const sortedResults = finalResults.sort((a, b) => b.score - a.score);
            displayResults(sortedResults.slice(0, 5));
        }
    };

    worker.onerror = (e) => {
        console.error('Worker error:', e);
        alert(translations.simulation_error);
        progress.style.width = '0%';
        resultsDiv.innerHTML = `<h3>${translations.simulation_failed}</h3>`;
    };

    const chunkSize = 10;
    for (let i = 0; i < combinations.length; i += chunkSize) {
        const chunk = combinations.slice(i, i + chunkSize);
        worker.postMessage([chunk, 1000]);
    }
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
    <h3>${translations.top_combinations}</h3>
    ${results.map((r, i) => `
        <div class="result-item">
            <div class="result-header">
                <span class="result-rank">#${i + 1}</span>
                <span class="result-score">${r.score.toFixed(1)} ${translations.points}</span>
            </div>
            <div class="result-dice">
                ${r.combination.map(die => `
                    <div class="die-container" data-tooltip="${die}: ${diceDB[die].map((p, idx) => `${idx + 1}=${p.toFixed(1)}%`).join(' ')}">
                        <img src="${diceImages[die]}" 
                             class="die-icon" 
                             alt="${die}" 
                             title="${die}">
                        <div class="die-label">${die.split(' ')[0]}</div>
                    </div>
                `).join('')}
            </div>
            <div class="result-breakdown">
                ${getScoreBreakdown(r.combination)}
            </div>
        </div>
    `).join('')}
    `;
}

function getScoreBreakdown(combo) {
    const guaranteed = combo.filter(d => diceDB[d].some(p => p === 100)).length;
    const triples = combo.filter(d => diceDB[d][2] >= 30).length;
    
    let strategy = '';
    if (guaranteed > 0) {
        strategy += `${guaranteed}x3 garantizados `;
    }
    if (triples > 0) {
        strategy += `${triples} dados potenciadores de triples`;
    }
    if (!strategy) {
        strategy = "Combinación balanceada (singles/escaleras)";
    }
    
    return `Estrategia: ${strategy} | Dados especiales: ${guaranteed + triples}/6`;
}

function updateTranslations() {
    document.getElementById('presetName').placeholder = translations.preset_name_placeholder;
}

document.addEventListener('DOMContentLoaded', () => {
    updateTranslations();
    if (typeof populateDiceOptions === 'function') populateDiceOptions();
});