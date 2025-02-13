const diceDB = {
    // ... (los mismos datos que antes)
};

// Initialize die selector
const dieSelect = document.getElementById('dieSelect');

const diceDB = {
    "Aranka's die": [28.6,4.8,28.6,4.8,28.6,4.8],
    "Cautious cheater's die": [23.8,14.3,9.5,14.3,23.8,14.3],
    "Ci die": [13.0,13.0,13.0,13.0,13.0,34.8],
    "Devil's head die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Die of misfortune": [4.5,22.7,22.7,22.7,22.7,4.5],
    "Even die": [6.7,26.7,6.7,26.7,6.7,26.7],
    "Favourable die": [33.3,0.0,5.6,5.6,33.3,22.2],
    "Fer die": [13.0,13.0,13.0,13.0,13.0,34.8],
    "Greasy die": [17.6,11.8,17.6,11.8,17.6,23.5],
    "Grimy die": [6.3,31.3,6.3,6.3,43.8,6.3],
    "Grozav's lucky die": [6.7,66.7,6.7,6.7,6.7,6.7],
    "Heavenly Kingdom die": [36.8,10.5,10.5,10.5,10.5,21.1],
    "Holy Trinity die": [18.2,22.7,45.5,4.5,4.5,4.5],
    "Hugo's Die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "King's die": [12.5,18.8,21.9,25.0,12.5,9.4],
    "Lousy gambler's die": [10.0,15.0,10.0,15.0,35.0,15.0],
    "Lu die": [13.0,13.0,13.0,13.0,13.0,34.8],
    "Lucky Die": [27.3,4.5,9.1,13.6,18.2,27.3],
    "Mathematician's Die": [16.7,20.8,25.0,29.2,4.2,4.2],
    "Molar die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Odd die": [26.7,6.7,26.7,6.7,26.7,6.7],
    "Ordinary die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Painted die": [18.8,6.3,6.3,6.3,43.8,18.8],
    "Pie die": [46.2,7.7,23.1,23.1,0.0,0.0],
    "Premolar die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Sad Greaser's Die": [26.1,26.1,4.3,4.3,26.1,13.0],
    "Saint Antiochus' die": [0.0,0.0,100.0,0.0,0.0,0.0],
    "Shrinking die": [22.2,11.1,11.1,11.1,11.1,33.3],
    "St. Stephen's die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Strip die": [25.0,12.5,12.5,12.5,18.8,18.8],
    "Three die": [12.5,6.3,56.3,6.3,12.5,6.3],
    "Unbalanced Die": [25.0,33.3,8.3,8.3,16.7,8.3],
    "Unlucky die": [9.1,27.3,18.2,18.2,18.2,9.1],
    "Wagoner's Die": [5.6,27.8,33.3,11.1,11.1,11.1],
    "Weighted die": [66.7,6.7,6.7,6.7,6.7,6.7],
    "Normal Die": [16.7,16.7,16.7,16.7,16.7,16.7]
};

// Initialize die selector
const dieSelect = document.getElementById('dieSelect');
Object.keys(diceDB).forEach(dieName => {
    const option = document.createElement('option');
    option.value = dieName;
    option.textContent = dieName;
    dieSelect.appendChild(option);
});

let selectedDice = [];

function addDie() {
    const dieName = dieSelect.value;
    selectedDice.push(dieName);
    updateDicePool();
}

function clearDice() {
    selectedDice = [];
    updateDicePool();
}

function updateDicePool() {
    const pool = document.getElementById('dicePool');
    pool.innerHTML = selectedDice.map(die => 
        `<div class="die-tag">${die}</div>`
    ).join('');
}