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

const diceImages = {
    "Aranka's die": "src/die_f_icon.png",
    "Cautious cheater's die": "src/die_b_icon.png",
    "Ci die": "src/die_r_icon.png",
    "Devil's head die": "src/die_r_devil_icon.png",
    "Die of misfortune": "src/die_c_icon.png",
    "Even die": "src/die_i_icon.png",
    "Favourable die": "src/die_j_icon.png",
    "Fer die": "src/die_r_icon.png",
    "Greasy die": "src/die_g_icon.png",
    "Grimy die": "src/die_e_icon.png",
    "Grozav's lucky die": "src/die_m_icon.png",
    "Heavenly Kingdom die": "src/die_kcd_icon.png",
    "Holy Trinity die": "src/die_g_icon.png",
    "Hugo's Die": "src/die_h_icon.png",
    "King's die": "src/die_k_icon.png",
    "Lousy gambler's die": "src/die_d_icon.png",
    "Lu die": "src/die_r_icon.png",
    "Lucky Die": "src/die_o_icon.png",
    "Mathematician's Die": "src/die_j_icon.png",
    "Molar die": "src/die_c_icon.png",
    "Odd die": "src/die_k_icon.png",
    "Ordinary die": "src/die_g_icon.png",
    "Painted die": "src/die_l_icon.png",
    "Pie die": "src/die_p_icon.png",
    "Premolar die": "src/die_c_icon.png",
    "Sad Greaser's Die": "src/die_q_icon.png",
    "Saint Antiochus' die": "src/die_q_icon.png",
    "Shrinking die": "src/die_h_icon.png",
    "St. Stephen's die": "src/die_g_icon.png",
    "Strip die": "src/die_o_icon.png",
    "Three die": "src/die_r_icon.png",
    "Unbalanced Die": "src/die_b_icon.png",
    "Unlucky die": "src/die_e_icon.png",
    "Wagoner's Die": "src/die_a_icon.png",
    "Weighted die": "src/die_f_icon.png",
    "Normal Die": "src/die_g_icon.png"
};

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
    updateFillButton();
}

function clearDice() {
    selectedDice = [];
    updateDicePool();
    updateFillButton();
}

function removeDie(index) {
    selectedDice.splice(index, 1);
    updateDicePool();
    updateFillButton();
}

function updateFillButton() {
    const fillButton = document.getElementById('fillDice');
    const fillCount = selectedDice.length < 6 ? 6 - selectedDice.length : 0;
    
    if (fillCount > 0) {
        fillButton.classList.add('visible');
        document.getElementById('fillCount').textContent = fillCount;
    } else {
        fillButton.classList.remove('visible');
    }
}

function fillWithNormalDice() {
    const needed = 6 - selectedDice.length;
    if (needed > 0) {
        selectedDice.push(...Array(needed).fill('Normal Die'));
        updateDicePool();
        updateFillButton();
    }
}

function updateDicePool() {
    const pool = document.getElementById('dicePool');
    pool.innerHTML = selectedDice.map((die, index) => `
        <div class="die-details">
            <button class="remove-btn" onclick="removeDie(${index})">×</button>
            <div class="die-title">${die.replace("'s", "")}</div>
            <table class="die-table">
                <tr class="die-header">
                    ${[1,2,3,4,5,6].map(n => `<th>${n}</th>`).join('')}
                </tr>
                <tr>
                    ${diceDB[die].map(p => `<td>${p.toFixed(1)}%</td>`).join('')}
                </tr>
            </table>
        </div>
    `).join('');
}