const worker = new Worker('data:application/javascript,' + encodeURIComponent(`
    const calculateScore = (roll) => {
        const counts = [0,0,0,0,0,0];
        roll.forEach(n => counts[n-1]++);
        
        let score = 0;
        
        // Singles
        score += counts[0] * 100;
        score += counts[4] * 50;
        
        // Triples y superiores
        for(let i = 0; i < 6; i++) {
            if(counts[i] >= 3) {
                const multiplier = Math.pow(2, counts[i] - 3);
                score += (i === 0 ? 1000 : (i+1)*100) * multiplier;
            }
        }
        
        // Straights
        if([1,2,3,4,5].every(n => counts[n-1] >= 1)) score += 500;
        if([2,3,4,5,6].every(n => counts[n-1] >= 1)) score += 750;
        if(counts.every(c => c >= 1)) score += 1500;
        
        return score;
    };
    
    self.onmessage = async (e) => {
        const [combinations, simulations] = e.data;
        const results = [];
        
        for(const combo of combinations) {
            let totalScore = 0;
            const dice = combo.map(name => diceDB[name]);
            
            for(let i = 0; i < simulations; i++) {
                const roll = dice.map(die => {
                    const rand = Math.random() * 100;
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
    `));
    
    function startSimulation() {
        if(selectedDice.length < 1) return alert("¡Selecciona dados primero!");
        
        const combinations = getUniqueCombinations(selectedDice, 6);
        const progress = document.getElementById('progress');
        const resultsDiv = document.getElementById('results');
        
        resultsDiv.innerHTML = "<h3>Calculando...</h3>";
        progress.style.width = '0%';
    
        worker.onmessage = (e) => {
            const results = e.data.sort((a, b) => b.score - a.score);
            displayResults(results.slice(0, 20));
            progress.style.width = '100%';
        };
    
        worker.postMessage([combinations, 5000]);
    }
    
    function getUniqueCombinations(dice, maxSize) {
        const counts = {};
        dice.forEach(die => counts[die] = (counts[die] || 0) + 1);
        
        const combinations = [];
        const dieTypes = Object.keys(counts);
        
        function generate(index, currentCombo, remaining) {
            if(currentCombo.length > 0 && currentCombo.length <= maxSize) {
                combinations.push([...currentCombo]);
            }
            if(remaining === 0 || index >= dieTypes.length) return;
            
            const die = dieTypes[index];
            const max = Math.min(counts[die], maxSize - currentCombo.length);
            
            for(let i = 0; i <= max; i++) {
                if(i > 0) currentCombo.push(die);
                generate(index + 1, currentCombo, remaining - i);
            }
            
            for(let i = 0; i < max; i++) {
                currentCombo.pop();
            }
        }
        
        generate(0, [], maxSize);
        return combinations;
    }
    
    function displayResults(results) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <h3>Top ${results.length} Combinaciones</h3>
            ${results.map((r, i) => `
                <div class="result-item">
                    <strong>#${i+1}</strong>: ${r.combination.join(', ')}
                    <br><em>Puntuación promedio:</em> ${r.score.toFixed(1)} puntos
                </div>
            `).join('')}
        `;
    }