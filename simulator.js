// simulator.js
const calculateScore = (roll) => {
    const counts = Array(6).fill(0);
    roll.forEach(n => counts[n-1]++);

    let score = 0;
    const baseScores = [1000, 200, 300, 400, 500, 600];
    
    // Evaluate all possible scoring combinations
    const scoringOptions = [];
    
    // Singles
    if(counts[0] > 0) scoringOptions.push({dice: [1], score: 100});
    if(counts[4] > 0) scoringOptions.push({dice: [5], score: 50});
    
    // Triples and beyond
    counts.forEach((count, i) => {
        if(count >= 3) {
            scoringOptions.push({
                dice: Array(count).fill(i + 1),
                score: baseScores[i] * (2 ** (count - 3))
            });
        }
    });
    
    // Straights
    const straight_1_5 = [1,2,3,4,5].every(n => counts[n-1] >= 1);
    const straight_2_6 = [2,3,4,5,6].every(n => counts[n-1] >= 1);
    const straight_1_6 = counts.every(c => c >= 1);
    
    if(straight_1_6) scoringOptions.push({dice: [1,2,3,4,5,6], score: 1500});
    else {
        if(straight_1_5) scoringOptions.push({dice: [1,2,3,4,5], score: 500});
        if(straight_2_6) scoringOptions.push({dice: [2,3,4,5,6], score: 750});
    }
    
    return {
        totalScore: scoringOptions.reduce((acc, opt) => acc + opt.score, 0),
        options: scoringOptions
    };
};

function getBestKeepingStrategy(roll, currentTurnScore, gameScore, targetScore, depth = 0) {
    const MAX_DEPTH = 3; // Profundidad máxima de análisis
    if (depth >= MAX_DEPTH) return { score: 0, keep: [] };
    
    const { totalScore, options } = calculateScore(roll);
    if (totalScore === 0) return { score: 0, keep: [] };
    
    // Generamos todas las posibles combinaciones de dados a mantener
    const possibleKeeps = generatePossibleKeeps(options);
    let bestScore = 0;
    let bestKeep = [];
    
    for (const keep of possibleKeeps) {
        let expectedValue = calculateExpectedValue(
            keep,
            roll.length - keep.length,
            currentTurnScore,
            gameScore,
            targetScore,
            depth
        );
        
        if (expectedValue > bestScore) {
            bestScore = expectedValue;
            bestKeep = keep;
        }
    }
    
    return { score: bestScore, keep: bestKeep };
}

function calculateExpectedValue(keptDice, remainingDiceCount, currentTurnScore, gameScore, targetScore, depth) {
    const SIMULATION_COUNT = 1000; // Aumentamos el número de simulaciones por combinación
    let totalValue = 0;
    
    // Si ya tenemos suficientes puntos para ganar, retornamos el valor actual
    if (currentTurnScore + gameScore >= targetScore) {
        return currentTurnScore;
    }
    
    // Monte Carlo simulation para calcular el valor esperado
    for (let i = 0; i < SIMULATION_COUNT; i++) {
        let simulationScore = currentTurnScore;
        let remainingDice = remainingDiceCount;
        
        while (remainingDice > 0) {
            const newRoll = simulateRoll(Array(remainingDice).fill('Normal Die'));
            const { score: rollScore, keep } = getBestKeepingStrategy(
                newRoll,
                simulationScore,
                gameScore,
                targetScore,
                depth + 1
            );
            
            if (rollScore === 0) {
                simulationScore = 0;
                break;
            }
            
            simulationScore += rollScore;
            remainingDice -= keep.length;
            
            // Evaluamos si es mejor parar aquí
            const stopProb = calculateStoppingProbability(
                simulationScore,
                remainingDice,
                gameScore,
                targetScore
            );
            
            if (Math.random() < stopProb) break;
        }
        
        totalValue += simulationScore;
    }
    
    return totalValue / SIMULATION_COUNT;
}

function calculateStoppingProbability(currentScore, remainingDice, gameScore, targetScore) {
    // Probabilidad dinámica de parar basada en varios factores
    const scoringRatio = (currentScore + gameScore) / targetScore;
    const riskFactor = remainingDice / 6;
    const baseProb = 0.3;
    
    // Aumentamos la probabilidad de parar si:
    // 1. Estamos cerca del objetivo
    // 2. Tenemos una buena puntuación actual
    // 3. Hay pocos dados restantes
    let stopProb = baseProb;
    stopProb += scoringRatio * 0.4;
    stopProb += (currentScore / 1000) * 0.3;
    stopProb -= riskFactor * 0.2;
    
    return Math.min(Math.max(stopProb, 0.1), 0.9);
}

function generatePossibleKeeps(scoringOptions) {
    const result = [[]];
    
    for (const option of scoringOptions) {
        const currentLength = result.length;
        for (let i = 0; i < currentLength; i++) {
            result.push([...result[i], ...option.dice]);
        }
    }
    
    return result;
}

function simulateGame(combinations, targetScore = 2000) {
    const GAMES_PER_COMBO = 2000; // Aumentamos el número de juegos por combinación
    const results = [];
    
    for (const combo of combinations) {
        let stats = {
            winCount: 0,
            totalTurns: 0,
            totalPoints: 0,
            maxScore: 0,
            minTurns: Infinity,
            pointDistribution: Array(21).fill(0), // Distribución de puntos por centenas
            turnsDistribution: Array(50).fill(0)  // Distribución de turnos
        };
        
        for (let game = 0; game < GAMES_PER_COMBO; game++) {
            let gameScore = 0;
            let turns = 0;
            let totalTurnPoints = 0;
            
            while (gameScore < targetScore && turns < 50) {
                const turnResult = simulateTurn(combo, gameScore, targetScore);
                gameScore += turnResult.score;
                totalTurnPoints += turnResult.score;
                turns++;
                
                // Actualizamos distribuciones
                if (turnResult.score > 0) {
                    const scoreIndex = Math.min(20, Math.floor(turnResult.score / 100));
                    stats.pointDistribution[scoreIndex]++;
                }
            }
            
            if (gameScore >= targetScore) {
                stats.winCount++;
                stats.totalTurns += turns;
                stats.minTurns = Math.min(stats.minTurns, turns);
                stats.turnsDistribution[turns]++;
            }
            
            stats.totalPoints += totalTurnPoints;
            stats.maxScore = Math.max(stats.maxScore, gameScore);
        }
        
        results.push({
            combination: combo,
            winRate: (stats.winCount / GAMES_PER_COMBO) * 100,
            avgTurnsToWin: stats.winCount ? stats.totalTurns / stats.winCount : Infinity,
            avgPointsPerGame: stats.totalPoints / GAMES_PER_COMBO,
            maxScore: stats.maxScore,
            minTurns: stats.minTurns,
            pointDistribution: stats.pointDistribution,
            turnsDistribution: stats.turnsDistribution
        });
    }
    
    return results.sort((a, b) => b.winRate - a.winRate);
}

function simulateTurn(dice, gameScore, targetScore) {
    let turnScore = 0;
    let remainingDice = [...dice];
    
    while (remainingDice.length > 0) {
        const roll = simulateRoll(remainingDice);
        const { score: potentialScore, keep } = getBestKeepingStrategy(
            roll,
            turnScore,
            gameScore,
            targetScore
        );
        
        if (potentialScore === 0) {
            return { score: 0, dice: [] };
        }
        
        turnScore += potentialScore;
        remainingDice.splice(0, keep.length);
        
        const stopProb = calculateStoppingProbability(
            turnScore,
            remainingDice.length,
            gameScore,
            targetScore
        );
        
        if (Math.random() < stopProb) break;
    }
    
    return { score: turnScore, dice: dice.length - remainingDice.length };
}

// Función mejorada para mostrar resultados más detallados
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
    <h3>${translations.top_combinations}</h3>
    ${results.slice(0, 5).map((r, i) => `
        <div class="result-item">
            <div class="result-header">
                <span class="result-rank">#${i+1}</span>
                <div class="result-stats">
                    <div class="stat-primary">Win Rate: ${r.winRate.toFixed(1)}%</div>
                    <div class="stat-detail">
                        <div>Avg Turns to Win: ${r.avgTurnsToWin.toFixed(1)}</div>
                        <div>Avg Points/Game: ${r.avgPointsPerGame.toFixed(1)}</div>
                        <div>Best Score: ${r.maxScore}</div>
                        <div>Fastest Win: ${r.minTurns} turns</div>
                    </div>
                    <div class="distribution-chart">
                        <div class="chart-title">Points per Turn Distribution</div>
                        <div class="chart-bars">
                            ${r.pointDistribution.map((count, i) => `
                                <div class="bar" style="height: ${(count / Math.max(...r.pointDistribution) * 100)}%"
                                     title="${i * 100}-${(i + 1) * 100} points: ${count} times">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
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