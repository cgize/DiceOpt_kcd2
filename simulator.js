// simulator.js
const calculateScore = (roll) => {
    const counts = Array(6).fill(0);
    roll.forEach(n => counts[n - 1]++);

    let score = 0;
    const baseScores = [1000, 200, 300, 400, 500, 600];

    // Triples corregidos: 2^(count-3)
    counts.forEach((count, i) => {
        if (count >= 3) score += baseScores[i] * Math.pow(2, count - 3);
    });

    // Escaleras
    if (score === 0) {
        if ([1, 2, 3, 4, 5].every(n => counts[n - 1] >= 1)) score += 500;
        if ([2, 3, 4, 5, 6].every(n => counts[n - 1] >= 1)) score += 750;
        if (counts.every(c => c >= 1)) score += 1500;
    }

    // Singles
    if (score === 0) {
        score += counts[0] * 100 + counts[4] * 50;
    }

    return score;
};

function getUniqueCombinations(selectedDice, maxSize = 6) {
    const normalized = selectedDice.length >= 6 
        ? selectedDice.slice(0, 6) 
        : [...selectedDice, ...Array(6 - selectedDice.length).fill('Normal Die')];

    const diceCounts = normalized.reduce((acc, die) => {
        acc[die] = (acc[die] || 0) + 1;
        return acc;
    }, {});

    const combinations = [];
    const diceTypes = Object.keys(diceCounts);
    
    const backtrack = (current, startIndex) => {
        if (current.length === 6) {
            combinations.push([...current]);
            return;
        }
        
        for (let i = startIndex; i < diceTypes.length; i++) {
            const die = diceTypes[i];
            const currentCount = current.filter(d => d === die).length;
            
            if (currentCount < diceCounts[die]) {
                current.push(die);
                backtrack(current, i);  // Mantener el índice para evitar permutaciones
                current.pop();
            }
        }
    };

    backtrack([], 0);
    return combinations.filter(c => c.length === 6);
}

const workerCode = `
const diceDB = ${JSON.stringify(diceDB)};
const calculateScore = ${calculateScore.toString()};

const simulateRoll = (combo) => {
    return combo.map(die => {
        const probs = diceDB[die];
        const guaranteed = probs.indexOf(100);
        if (guaranteed > -1) return guaranteed + 1;
        
        const rand = Math.random() * 100;
        let accum = 0;
        for (let f = 0; f < 6; f++) {
            accum += probs[f];
            if (rand <= accum) return f + 1;
        }
        return 6;
    });
};

self.onmessage = (e) => {
    const [combinations, sims] = e.data;
    const results = [];
    
    for (const combo of combinations) {
        let total = 0;
        const batchSize = 500;
        const batches = Math.ceil(sims / batchSize);
        
        for (let b = 0; b < batches; b++) {
            let batchTotal = 0;
            const remaining = sims - (b * batchSize);
            const iterations = Math.min(batchSize, remaining);
            
            for (let i = 0; i < iterations; i++) {
                batchTotal += calculateScore(simulateRoll(combo));
            }
            total += batchTotal;
        }
        
        results.push({
            combination: combo,
            score: total / sims,
            strategy: {
                guaranteed: combo.filter(d => diceDB[d].some(p => p === 100)).length,
                triples: combo.filter(d => diceDB[d][2] >= 30).length,
                wildcards: combo.filter(d => !diceDB[d].some(p => p === 100) && diceDB[d][2] < 30).length
            }
        });
    }
    
    postMessage(results);
};
`;

const blob = new Blob([workerCode], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

let finalResults = [];
let currentSimulation = null;

function startSimulation() {
    if (selectedDice.length === 0) {
        alert(translations.no_dice_selected);
        return;
    }

    if (currentSimulation) {
        worker.terminate();
        currentSimulation = null;
    }

    const combinations = getUniqueCombinations(selectedDice);
    const progress = document.getElementById('progress');
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = `<h3>${translations.calculating}</h3>`;
    progress.style.width = '0%';
    finalResults = [];
    currentSimulation = Date.now();

    worker.onmessage = (e) => {
        if (currentSimulation === null) return;

        const chunkResults = e.data;
        finalResults = [...finalResults, ...chunkResults];

        const processed = finalResults.length;
        const total = combinations.length;
        progress.style.width = `${Math.min(100, (processed / total) * 100)}%`;

        if (processed >= total) {
            const sorted = finalResults.sort((a, b) => b.score - a.score);
            displayResults(sorted.slice(0, 5));
            currentSimulation = null;
        }
    };

    worker.onerror = (e) => {
        console.error('Worker error:', e);
        alert(translations.simulation_error);
        progress.style.width = '0%';
        resultsDiv.innerHTML = `<h3>${translations.simulation_failed}</h3>`;
        currentSimulation = null;
    };

    const chunkSize = 15;
    for (let i = 0; i < combinations.length; i += chunkSize) {
        const chunk = combinations.slice(i, i + chunkSize);
        worker.postMessage([chunk, 1500]);
    }
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    
    if (!results || results.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <h3>${translations.no_combinations}</h3>
                <p>${translations.try_adding_special_dice}</p>
            </div>
        `;
        return;
    }

    resultsDiv.innerHTML = `
        <h3>${translations.top_combinations}</h3>
        ${results.map((r, i) => `
            <div class="result-item">
                <div class="result-header">
                    <span class="result-rank">#${i + 1}</span>
                    <span class="result-score">${r.score.toFixed(1)} ${translations.points}</span>
                </div>
                
                <div class="dice-composition">
                    ${r.combination.map(die => `
                        <div class="die-group" data-tooltip="${die}: ${diceDB[die].map((p, idx) => `${idx + 1}=${p.toFixed(1)}%`).join(' ')}">
                            <img src="${diceImages[die]}" class="die-icon" alt="${die}">
                            <span class="die-count">${r.combination.filter(d => d === die).length}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="strategy-analysis">
                    ${r.strategy.guaranteed > 0 ? `
                        <div class="strategy-badge guaranteed">
                            <span class="badge-count">${r.strategy.guaranteed}</span>
                            <span>${translations.guaranteed_triples}</span>
                        </div>
                    ` : ''}
                    
                    ${r.strategy.triples > 0 ? `
                        <div class="strategy-badge triple-boost">
                            <span class="badge-count">${r.strategy.triples}</span>
                            <span>${translations.triple_boosters}</span>
                        </div>
                    ` : ''}
                    
                    ${r.strategy.wildcards > 0 ? `
                        <div class="strategy-badge wildcard">
                            <span class="badge-count">${r.strategy.wildcards}</span>
                            <span>${translations.wildcards}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('')}
    `;
}

function updateTranslations() {
    const presetNameInput = document.getElementById('presetName');
    if (presetNameInput) {
        presetNameInput.placeholder = translations.preset_name_placeholder;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTranslations();
    if (typeof populateDiceOptions === 'function') populateDiceOptions();
});