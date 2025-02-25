// simulator.js
const calculateScore = (roll) => {
    // Separar dados normales y comodines
    let normalDice = [];
    let jokers = 0;
    
    roll.forEach(dieResult => {
        if (dieResult.die === "Devil's Head Die" && dieResult.value === 1) {
            jokers++;
        } else {
            normalDice.push(dieResult.value);
        }
    });

    const sortedRoll = [...normalDice].sort((a, b) => a - b);
    const counts = Array(6).fill(0);
    sortedRoll.forEach(n => counts[n - 1]++);

    let score = 0;
    const baseScores = [1000, 200, 300, 400, 500, 600];

    // Función para verificar secuencias con comodines
    const checkSequenceWithJokers = (requiredNumbers, jokersAvailable, scoreValue) => {
        let missing = 0;
        requiredNumbers.forEach(n => {
            if (counts[n - 1] === 0) missing++;
        });
        return missing <= jokersAvailable ? scoreValue : 0;
    };

    // 1. Verificar secuencias
    if (checkSequenceWithJokers([1,2,3,4,5,6], jokers, 1500)) {
        score = 1500;
        jokers -= Math.max(0, 6 - normalDice.length);
    } else if (checkSequenceWithJokers([2,3,4,5,6], jokers, 750)) {
        score = 750;
        jokers -= Math.max(0, 5 - normalDice.length);
    } else if (checkSequenceWithJokers([1,2,3,4,5], jokers, 500)) {
        score = 500;
        jokers -= Math.max(0, 5 - normalDice.length);
    }

    // 2. Triples con comodines
    if (score === 0) {
        counts.forEach((count, i) => {
            const needed = Math.max(3 - count, 0);
            if (needed <= jokers) {
                score += baseScores[i] * Math.pow(2, (count + needed) - 3);
                jokers -= needed;
            }
        });
    }

    // 3. Singles (sin comodines)
    if (score === 0) {
        score += counts[0] * 100 + counts[4] * 50;
    }

    return score;
};

// ==================== FUNCIONES DE SIMULACIÓN ====================
const simulateRoll = (combo) => {
    return combo.map(dieName => {
        const probs = diceDB[dieName];
        let rand = Math.random() * 100;
        for (let f = 0; f < 6; f++) {
            if (rand <= probs[f]) return {
                die: dieName,
                value: f + 1
            };
            rand -= probs[f];
        }
        return {
            die: dieName,
            value: 6
        };
    });
};

const getUniqueCombinations = (selectedDice, maxDice) => {
    if (selectedDice.length > maxDice) {
        alert(translations.max_dice_error.replace("{MAX_DICE}", maxDice));
        return [];
    }

    const normalized = selectedDice.length < 6 
        ? [...selectedDice, ...Array(6 - selectedDice.length).fill('Regular Die')] 
        : selectedDice.slice(0, maxDice);

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

// ==================== WEB WORKER ====================
const workerCode = `
const calculateScore = ${calculateScore.toString()};
const diceDB = ${JSON.stringify(diceDB)};
const simulateRoll = ${simulateRoll.toString()};

self.onmessage = (e) => {
    const [combinations, sims, batchSize] = e.data; // Añadimos batchSize
    const results = [];
    
    for (const combo of combinations) {
        let totalScore = 0;
        
        for (let i = 0; i < sims; i += batchSize) {
            let batchTotal = 0;
            const iterations = Math.min(batchSize, sims - i);
            
            for (let j = 0; j < iterations; j++) {
                const roll = simulateRoll(combo);
                batchTotal += calculateScore(roll);
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

// ==================== MANEJO DE SIMULACIÓN ====================
const startSimulation = () => {
    if (selectedDice.length === 0) {
        alert(translations.no_dice_selected);
        return;
    }

    if (currentSimulation) worker.terminate();
    
    // Obtener valores de los sliders
    const maxDice = parseInt(document.getElementById('maxDice').value);
    const rollSimMultiplier = parseInt(document.getElementById('increaseRollSim').value);
    const batchSimMultiplier = parseInt(document.getElementById('increaseBatchSim').value);
    
    const sims = 5000 * rollSimMultiplier;       // Ajustar número de simulaciones
    const batchSize = 1000 * batchSimMultiplier;  // Ajustar tamaño del batch
    const CHUNK_SIZE = 50;                       // Mantener como está por ahora

    const combinations = getUniqueCombinations(selectedDice, maxDice);
    if (combinations.length === 0) return;
    
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

    for (let i = 0; i < combinations.length; i += CHUNK_SIZE) {
        worker.postMessage([combinations.slice(i, i + CHUNK_SIZE), sims, batchSize]);
    }
};

// ==================== VISUALIZACIÓN DE RESULTADOS ====================
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
                            <div class="die-container">
                                <img src="${diceImages[die]}" class="die-icon-results" alt="${die}">
                                <span class="die-count">${count}</span>
                            </div>
                            <span class="die-name">${die}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}`;
};

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar el panel de configuración
    document.getElementById('settingsButton').addEventListener('click', function() {
        const panel = document.getElementById('settingsPanel');
        panel.classList.toggle('show');
    });

    // Cerrar el panel al hacer clic fuera
    document.addEventListener('click', function(event) {
        const panel = document.getElementById('settingsPanel');
        const button = document.getElementById('settingsButton');
        if (!panel.contains(event.target) && !button.contains(event.target)) {
            panel.classList.remove('show');
        }
    });

    // Referencias a los sliders
    const maxDiceSlider = document.getElementById('maxDice');
    const rollSimSlider = document.getElementById('increaseRollSim');
    const batchSimSlider = document.getElementById('increaseBatchSim');

    // Cargar valores guardados en localStorage al iniciar
    const savedMaxDice = localStorage.getItem('maxDice');
    if (savedMaxDice) {
        maxDiceSlider.value = savedMaxDice;
        updateMaxDiceValue(savedMaxDice);
    }

    const savedRollSim = localStorage.getItem('increaseRollSim');
    if (savedRollSim) {
        rollSimSlider.value = savedRollSim;
        updateRollSimValue(savedRollSim);
    }

    const savedBatchSim = localStorage.getItem('increaseBatchSim');
    if (savedBatchSim) {
        batchSimSlider.value = savedBatchSim;
        updateBatchSimValue(savedBatchSim);
    }

    // Guardar valores en localStorage al cambiar los sliders
    maxDiceSlider.addEventListener('input', function() {
        const value = this.value;
        localStorage.setItem('maxDice', value);
        updateMaxDiceValue(value);
    });

    rollSimSlider.addEventListener('input', function() {
        const value = this.value;
        localStorage.setItem('increaseRollSim', value);
        updateRollSimValue(value);
    });

    batchSimSlider.addEventListener('input', function() {
        const value = this.value;
        localStorage.setItem('increaseBatchSim', value);
        updateBatchSimValue(value);
    });

    // Actualizar valores iniciales si no hay datos guardados
    if (!savedMaxDice) updateMaxDiceValue(maxDiceSlider.value);
    if (!savedRollSim) updateRollSimValue(rollSimSlider.value);
    if (!savedBatchSim) updateBatchSimValue(batchSimSlider.value);
});

// Funciones para actualizar los valores mostrados
function updateMaxDiceValue(value) {
    document.getElementById('maxDiceValue').textContent = value;
}

function updateRollSimValue(value) {
    document.getElementById('rollSimValue').textContent = `${value}x`;
}

function updateBatchSimValue(value) {
    document.getElementById('batchSimValue').textContent = `${value}x`;
}