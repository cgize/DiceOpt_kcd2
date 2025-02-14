// simulator.js
const calculateScore = (roll) => {
    const counts = Array(6).fill(0);
    roll.forEach(n => counts[n - 1]++);

    let score = 0;
    const baseScores = [1000, 200, 300, 400, 500, 600];

    // 1. Verificar secuencias (prioridad absoluta)
    if (counts.every(c => c >= 1)) {
        score = 1500;
    } else if ([2, 3, 4, 5, 6].every(n => counts[n - 1] >= 1)) {
        score = 750;
    } else if ([1, 2, 3, 4, 5].every(n => counts[n - 1] >= 1)) {
        score = 500;
    }

    // 2. Calcular triples si no hay secuencia
    if (score === 0) {
        counts.forEach((count, i) => {
            if (count >= 3) {
                score += baseScores[i] * Math.pow(2, count - 3);
            }
        });
    }

    // 3. Singles solo si no hay puntuación
    if (score === 0) {
        score += counts[0] * 100 + counts[4] * 50;
    }

    return score;
};

const getUniqueCombinations = (selectedDice) => {
    const MAX_DICE = 20;
    const availableDice = selectedDice.slice(0, MAX_DICE);
    
    const normalized = availableDice.length < 6 
    ? [
        ...availableDice,
        ...Array(6 - availableDice.length).fill('Normal Die')
      ] 
    : availableDice;

    const diceCounts = normalized.reduce((acc, die) => {
        acc[die] = (acc[die] || 0) + 1;
        return acc;
    }, {});

    const combinations = [];
    const diceTypes = Object.keys(diceCounts);
    
    const backtrack = (current, startIndex, counts = {}) => {
        if (current.length === 6) {
            combinations.push([...current]);
            return;
        }
        
        for (let i = startIndex; i < diceTypes.length; i++) {
            const die = diceTypes[i];
            if ((counts[die] || 0) < diceCounts[die]) {
                backtrack(
                    [...current, die],
                    i,
                    { ...counts, [die]: (counts[die] || 0) + 1 }
                );
            }
        }
    };

    backtrack([], 0);
    return combinations;
};

const workerCode = `
const calculateScore = ${calculateScore.toString()};
const diceDB = ${JSON.stringify(diceDB)};

const simulateRoll = (combo) => {
    return combo.map(die => {
        const probs = diceDB[die];
        let rand = Math.random() * 100;
        for (let f = 0; f < 6; f++) {
            if (rand <= probs[f]) return f + 1;
            rand -= probs[f];
        }
        return 6;
    });
};

self.onmessage = (e) => {
    const [combinations, sims] = e.data;
    const results = [];
    
    for (const combo of combinations) {
        let totalScore = 0;
        const batchSize = 500;
        
        for (let i = 0; i < sims; i += batchSize) {
            let batchTotal = 0;
            const iterations = Math.min(batchSize, sims - i);
            
            for (let j = 0; j < iterations; j++) {
                batchTotal += calculateScore(simulateRoll(combo));
            }
            totalScore += batchTotal;
        }
        
        results.push({
            combination: combo,
            score: totalScore / sims,
            composition: combo.reduce((acc, die) => {
                acc[die] = (acc[die] || 0) + 1;
                return acc;
            }, {})
        });
    }
    
    postMessage(results);
};
`;

const blob = new Blob([workerCode], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

let finalResults = [];
let currentSimulation = null;

const startSimulation = () => {
    if (selectedDice.length === 0) {
        alert(translations.no_dice_selected);
        return;
    }

    if (currentSimulation) worker.terminate();
    
    const combinations = getUniqueCombinations(selectedDice);
    const progress = document.getElementById('progress');
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = `<h3>${translations.calculating}</h3>`;
    progress.style.width = '0%';
    finalResults = [];
    currentSimulation = Date.now();

    worker.onmessage = (e) => {
        if (currentSimulation === null) return;

        finalResults.push(...e.data);
        progress.style.width = `${Math.min(100, (finalResults.length / combinations.length) * 100)}%`;

        if (finalResults.length >= combinations.length) {
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

    const CHUNK_SIZE = 25;
    for (let i = 0; i < combinations.length; i += CHUNK_SIZE) {
        worker.postMessage([combinations.slice(i, i + CHUNK_SIZE), 1000]);
    }
};

const displayResults = (results) => {
    const resultsDiv = document.getElementById('results');
    
    if (!results || results.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <h3>${translations.no_combinations}</h3>
                <p>${translations.try_adding_special_dice}</p>
            </div>`;
        return;
    }

    resultsDiv.innerHTML = `
        <h3>${translations.top_combinations}</h3>
        ${results.map((result, index) => `
            <div class="result-item compact">
                <div class="result-header">
                    <span class="result-rank">#${index + 1}</span>
                    <span class="result-score">${result.score.toFixed(1)}${translations.points}</span>
                </div>
                <div class="dice-composition">
                    ${Object.entries(result.composition).map(([die, count]) => `
                        <div class="die-group" 
                             data-tooltip="${die}: ${diceDB[die].map((p, i) => `${i+1}=${p.toFixed(1)}%`).join(' ')}">
                            <img src="${diceImages[die]}" class="die-icon-compact" alt="${die}">
                            <span class="die-count">${count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}`;
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof populateDiceOptions === 'function') populateDiceOptions();
});