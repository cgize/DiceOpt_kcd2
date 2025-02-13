// simulator.js
const calculateScore = (roll) => {
    const counts = Array(6).fill(0);
    roll.forEach(n => counts[n-1]++);

    let score = 0;
    const baseScores = [1000, 200, 300, 400, 500, 600];

    // Singles
    score += counts[0] * 100; 
    score += counts[4] * 50;

    // Triples y múltiplos
    counts.forEach((count, i) => {
        if (count >= 3) {
            score += baseScores[i] * (2 ** (count - 3));
        }
    });

    // Escaleras
    if ([1,2,3,4,5].every(n => counts[n-1] >= 1)) score += 500;
    if ([2,3,4,5,6].every(n => counts[n-1] >= 1)) score += 750;
    if (counts.every(c => c >= 1)) score += 1500;

    return score;
};

function getUniqueCombinations(dice, maxSize) {
    const counts = {};
    dice.forEach(die => counts[die] = (counts[die] || 0) + 1);
    
    const combinations = [];
    const dieTypes = Object.keys(counts);
    
    function generate(index, currentCombo, currentCount) {
        if(currentCount > maxSize) return;
        if(currentCount > 0) combinations.push([...currentCombo]);
        
        if(index >= dieTypes.length) return;
        
        const die = dieTypes[index];
        const max = Math.min(counts[die], maxSize - currentCount);
        
        for(let i = 0; i <= max; i++) {
            generate(
                index + 1,
                i > 0 ? [...currentCombo, ...Array(i).fill(die)] : currentCombo,
                currentCount + i
            );
        }
    }
    
    generate(0, [], 0);
    return combinations.filter(c => c.length <= maxSize && c.length > 0);
}

const workerCode = `
const calculateScore = ${calculateScore.toString()};
const diceDB = ${JSON.stringify(diceDB)};

self.onmessage = (e) => {
    const [combinations, simulations] = e.data;
    const results = [];
    
    for(const combo of combinations) {
        let totalScore = 0;
        const dice = combo.map(name => diceDB[name]);
        
        for(let i = 0; i < simulations; i++) {
            const roll = dice.map(die => {
                let rand = Math.random() * 100;
                let accum = 0;
                for(let f = 0; f < 6; f++) {
                    accum += die[f];
                    if(rand <= accum) return f + 1;
                }
                return 6;
            });
            totalScore += calculateScore(roll);
        }
        
        results.push({
            combination: combo,
            score: totalScore / simulations
        });
    }
    
    postMessage(results);
};
`;

const blob = new Blob([workerCode], {type: 'application/javascript'});
const worker = new Worker(URL.createObjectURL(blob));

let finalResults = [];

function startSimulation() {
    if(selectedDice.length < 1) return alert("¡Selecciona dados primero!");
    
    const combinations = getUniqueCombinations(selectedDice, 6);
    const progress = document.getElementById('progress');
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = "<h3>Calculando...</h3>";
    progress.style.width = '0%';
    finalResults = [];

    worker.onmessage = (e) => {
        const chunkResults = e.data;
        finalResults = finalResults.concat(chunkResults);
        
        const processed = finalResults.length;
        const total = combinations.length;
        progress.style.width = `${(processed / total) * 100}%`;
        
        if(processed >= total) {
            const sortedResults = finalResults.sort((a, b) => b.score - a.score);
            displayResults(sortedResults.slice(0, 5));
        }
    };

    // Dividir en chunks de 10 combinaciones
    const chunkSize = 10;
    for(let i = 0; i < combinations.length; i += chunkSize) {
        const chunk = combinations.slice(i, i + chunkSize);
        worker.postMessage([chunk, 1000]); // 1000 simulaciones por chunk
    }
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Top 5 Combinaciones</h3>
        ${results.map((r, i) => `
            <div class="result-item">
                <div class="result-header">
                    <span class="result-rank">#${i+1}</span>
                    <span class="result-score">${r.score.toFixed(1)} puntos</span>
                </div>
                <div class="result-dice">
                    ${r.combination.map(die => `
                        <div class="die-container">
                            <img src="${diceImages[die]}" 
                                 class="die-icon" 
                                 alt="${die.replace("'s", "")}" 
                                 title="${die}">
                            <div class="die-label">${die.split(' ')[0]}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    `;
}