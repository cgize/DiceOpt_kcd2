// simulator.js
const calculateScore = (roll) => {
    const counts = Array(6).fill(0);
    roll.forEach(n => counts[n - 1]++);

    let score = 0;
    const baseScores = [1000, 200, 300, 400, 500, 600];

    // Cálculo de triples
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

function getUniqueCombinations(selectedDice) {
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
                backtrack(current, i);
                current.pop();
            }
        }
    };

    backtrack([], 0);
    return combinations;
}

// Worker optimizado
const workerCode = `
const diceDB = ${JSON.stringify(diceDB)};
const calculateScore = ${calculateScore.toString()};

const simulateRoll = (combo) => {
    return combo.map(die => {
        const probs = diceDB[die];
        const guaranteedFace = probs.findIndex(p => p === 100);
        if (guaranteedFace !== -1) return guaranteedFace + 1;
        
        let rand = Math.random() * 100;
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
        let totalScore = 0;
        
        // Procesamiento por lotes para mejor rendimiento
        const batchSize = 500;
        for (let i = 0; i < sims; i += batchSize) {
            const iterations = Math.min(batchSize, sims - i);
            let batchTotal = 0;
            
            for (let j = 0; j < iterations; j++) {
                batchTotal += calculateScore(simulateRoll(combo));
            }
            totalScore += batchTotal;
        }
        
        results.push({
            combination: combo,
            score: totalScore / sims,
            strategy: {
                guaranteed: combo.filter(d => diceDB[d].some(p => p === 100)).length,
                triples: combo.filter(d => diceDB[d][2] >= 30).length
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

    // Resetear simulación anterior
    if (currentSimulation) worker.terminate();
    
    const combinations = getUniqueCombinations(selectedDice);
    const progress = document.getElementById('progress');
    const resultsDiv = document.getElementById('results');

    // Inicializar estado
    resultsDiv.innerHTML = `<h3>${translations.calculating}</h3>`;
    progress.style.width = '0%';
    finalResults = [];
    currentSimulation = Date.now();

    // Configurar handlers
    worker.onmessage = (e) => {
        if (currentSimulation === null) return;

        finalResults = [...finalResults, ...e.data];
        const totalCombinations = combinations.length;
        
        // Actualizar progreso
        progress.style.width = `${Math.min(100, (finalResults.length / totalCombinations) * 100)}%`;

        // Mostrar resultados finales
        if (finalResults.length >= totalCombinations) {
            const sorted = finalResults.sort((a, b) => {
                // Orden principal por puntuación
                if (b.score !== a.score) return b.score - a.score;
                // Orden secundario por triples garantizados
                return b.strategy.guaranteed - a.strategy.guaranteed;
            });
            
            displayResults(sorted.slice(0, 5));
            currentSimulation = null;
        }
    };

    worker.onerror = (e) => {
        console.error('Error en worker:', e);
        alert(translations.simulation_error);
        progress.style.width = '0%';
        resultsDiv.innerHTML = `<h3>${translations.simulation_failed}</h3>`;
        currentSimulation = null;
    };

    // Dividir en chunks y procesar
    const CHUNK_SIZE = 25; // Optimizado para balancear rendimiento/responsividad
    for (let i = 0; i < combinations.length; i += CHUNK_SIZE) {
        const chunk = combinations.slice(i, i + CHUNK_SIZE);
        worker.postMessage([chunk, 1000]); // 1000 simulaciones por combinación
    }
}

function displayResults(results) {
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
            <div class="result-item">
                <div class="result-header">
                    <span class="result-rank">#${index + 1}</span>
                    <span class="result-score">${result.score.toFixed(1)} ${translations.points}</span>
                </div>
                
                <div class="dice-composition">
                    ${result.combination.map(die => `
                        <div class="die-group" data-tooltip="${die}: ${diceDB[die].map((p, i) => `${i+1}=${p.toFixed(1)}%`).join(' ')}">
                            <img src="${diceImages[die]}" class="die-icon" alt="${die}">
                            <span class="die-count">${result.combination.filter(d => d === die).length}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="strategy-analysis">
                    ${result.strategy.guaranteed > 0 ? `
                        <div class="strategy-badge guaranteed">
                            <span>${result.strategy.guaranteed}x</span>
                            ${translations.guaranteed_triples}
                        </div>` : ''}
                    
                    ${result.strategy.triples > 0 ? `
                        <div class="strategy-badge triple-boost">
                            <span>${result.strategy.triples}x</span>
                            ${translations.triple_boosters}
                        </div>` : ''}
                </div>
            </div>
        `).join('')}`;
}

// Inicialización final
document.addEventListener('DOMContentLoaded', () => {
    if (typeof updateTranslations === 'function') updateTranslations();
    if (typeof populateDiceOptions === 'function') populateDiceOptions();
});