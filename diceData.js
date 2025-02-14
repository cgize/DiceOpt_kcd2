// diceData.js
const diceDB = {
    "Aranka's Die": [28.6,4.8,28.6,4.8,28.6,4.8],
    "Cautious Cheater's Die": [23.8,14.3,9.5,14.3,23.8,14.3],
    "Ci Die": [13.0,13.0,13.0,13.0,13.0,34.8],
    "Devil's Head Die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Die of Misfortune": [4.5,22.7,22.7,22.7,22.7,4.5],
    "Even Die": [6.7,26.7,6.7,26.7,6.7,26.7],
    "Favorable Die": [33.3,0.0,5.6,5.6,33.3,22.2],
    "Fer Die": [13.0,13.0,13.0,13.0,13.0,34.8],
    "Greasy Die": [17.6,11.8,17.6,11.8,17.6,23.5],
    "Grimy Die": [6.3,31.3,6.3,6.3,43.8,6.3],
    "Grozav's Lucky Die": [6.7,66.7,6.7,6.7,6.7,6.7],
    "Heavenly Kingdom Die": [36.8,10.5,10.5,10.5,10.5,21.1],
    "Holy Trinity Die": [18.2,22.7,45.5,4.5,4.5,4.5],
    "Hugo's Die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "King's Die": [12.5,18.8,21.9,25.0,12.5,9.4],
    "Lousy Gambler's Die": [10.0,15.0,10.0,15.0,35.0,15.0],
    "Lu Die": [13.0,13.0,13.0,13.0,13.0,34.8],
    "Lucky Die": [27.3,4.5,9.1,13.6,18.2,27.3],
    "Mathematician's Die": [16.7,20.8,25.0,29.2,4.2,4.2],
    "Molar Die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Odd Die": [26.7,6.7,26.7,6.7,26.7,6.7],
    "Ordinary Die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Painted Die": [18.8,6.3,6.3,6.3,43.8,18.8],
    "Pie Die": [46.2,7.7,23.1,23.1,0.0,0.0],
    "Premolar Die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Sad Greaser's Die": [26.1,26.1,4.3,4.3,26.1,13.0],
    "Saint Antiochus' Die": [0.0,0.0,100.0,0.0,0.0,0.0],
    "Shrinking Die": [22.2,11.1,11.1,11.1,11.1,33.3],
    "St. Stephen's Die": [16.7,16.7,16.7,16.7,16.7,16.7],
    "Strip Die": [25.0,12.5,12.5,12.5,18.8,18.8],
    "Three Die": [12.5,6.3,56.3,6.3,12.5,6.3],
    "Unbalanced Die": [25.0,33.3,8.3,8.3,16.7,8.3],
    "Unlucky Die": [9.1,27.3,18.2,18.2,18.2,9.1],
    "Wagoner's Die": [5.6,27.8,33.3,11.1,11.1,11.1],
    "Weighted Die": [66.7,6.7,6.7,6.7,6.7,6.7],
    "Normal Die": [16.7,16.7,16.7,16.7,16.7,16.7]
};

const diceImages = {
    "Aranka's Die": "/DiceOpt_kcd2/src/die_f_icon.png",
    "Cautious Cheater's Die": "/DiceOpt_kcd2/src/die_b_icon.png",
    "Ci Die": "/DiceOpt_kcd2/src/die_r_icon.png",
    "Devil's Head Die": "/DiceOpt_kcd2/src/die_r_devil_icon.png",
    "Die of Misfortune": "/DiceOpt_kcd2/src/die_c_icon.png",
    "Even Die": "/DiceOpt_kcd2/src/die_i_icon.png",
    "Favorable Die": "/DiceOpt_kcd2/src/die_j_icon.png",
    "Fer Die": "/DiceOpt_kcd2/src/die_r_icon.png",
    "Greasy Die": "/DiceOpt_kcd2/src/die_g_icon.png",
    "Grimy Die": "/DiceOpt_kcd2/src/die_e_icon.png",
    "Grozav's Lucky Die": "/DiceOpt_kcd2/src/die_m_icon.png",
    "Heavenly Kingdom Die": "/DiceOpt_kcd2/src/die_kcd_icon.png",
    "Holy Trinity Die": "/DiceOpt_kcd2/src/die_g_icon.png",
    "Hugo's Die": "/DiceOpt_kcd2/src/die_h_icon.png",
    "King's Die": "/DiceOpt_kcd2/src/die_k_icon.png",
    "Lousy Gambler's Die": "/DiceOpt_kcd2/src/die_d_icon.png",
    "Lu Die": "/DiceOpt_kcd2/src/die_r_icon.png",
    "Lucky Die": "/DiceOpt_kcd2/src/die_o_icon.png",
    "Mathematician's Die": "/DiceOpt_kcd2/src/die_j_icon.png",
    "Molar Die": "/DiceOpt_kcd2/src/die_c_icon.png",
    "Odd Die": "/DiceOpt_kcd2/src/die_k_icon.png",
    "Ordinary Die": "/DiceOpt_kcd2/src/die_g_icon.png",
    "Painted Die": "/DiceOpt_kcd2/src/die_l_icon.png",
    "Pie Die": "/DiceOpt_kcd2/src/die_p_icon.png",
    "Premolar Die": "/DiceOpt_kcd2/src/die_c_icon.png",
    "Sad Greaser's Die": "/DiceOpt_kcd2/src/die_q_icon.png",
    "Saint Antiochus' Die": "/DiceOpt_kcd2/src/die_q_icon.png",
    "Shrinking Die": "/DiceOpt_kcd2/src/die_h_icon.png",
    "St. Stephen's Die": "/DiceOpt_kcd2/src/die_g_icon.png",
    "Strip Die": "/DiceOpt_kcd2/src/die_o_icon.png",
    "Three Die": "/DiceOpt_kcd2/src/die_r_icon.png",
    "Unbalanced Die": "/DiceOpt_kcd2/src/die_b_icon.png",
    "Unlucky Die": "/DiceOpt_kcd2/src/die_e_icon.png",
    "Wagoner's Die": "/DiceOpt_kcd2/src/die_a_icon.png",
    "Weighted Die": "/DiceOpt_kcd2/src/die_f_icon.png",
    "Normal Die": "/DiceOpt_kcd2/src/die_g_icon.png"
};

// Configuración del selector con filtro
const dieSelect = document.getElementById('dieSelect');
const searchInput = document.createElement('input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('placeholder', translations.search_dice);
searchInput.classList.add('search-input');
dieSelect.parentNode.insertBefore(searchInput, dieSelect);

function populateDiceOptions(filter = '') {
    dieSelect.innerHTML = '';
    Object.keys(diceDB).forEach(dieName => {
        if(dieName.toLowerCase().includes(filter.toLowerCase())) {
            const option = document.createElement('option');
            option.value = dieName;
            option.textContent = dieName;
            dieSelect.appendChild(option);
        }
    });
}

// Corrección 1: Event listener único con debounce
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        populateDiceOptions(e.target.value);
    }, 300);
});

// Inicializar
populateDiceOptions();

// Estado y funciones
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
    const fillCount = Math.max(0, 6 - selectedDice.length);
    fillButton.classList.toggle('visible', fillCount > 0);
    document.getElementById('fillCount').textContent = fillCount;
}

function fillWithNormalDice() {
    const needed = Math.max(0, 6 - selectedDice.length);
    if (needed > 0) {
        selectedDice.push(...Array(needed).fill('Normal Die'));
        updateDicePool();
        updateFillButton();
    }
}

// Corrección 4: Atributos alt mejorados
function updateDicePool() {
    const pool = document.getElementById('dicePool');
    pool.innerHTML = selectedDice.map((die, index) => `
        <div class="die-details">
            <button class="remove-btn" onclick="removeDie(${index})">×</button>
            <div class="die-title">
                <img src="${diceImages[die]}" 
                     class="die-icon-small" 
                     alt="${die}" 
                     title="${die}">
                ${die}
            </div>
            <table class="die-table">
                <tr class="die-header">${[1,2,3,4,5,6].map(n => `<th>${n}</th>`).join('')}</tr>
                <tr>${diceDB[die].map(p => `<td>${p.toFixed(1)}%</td>`).join('')}</tr>
            </table>
        </div>
    `).join('');
}

// Presets System
const presetsKey = 'dicePresets';
let presets = JSON.parse(localStorage.getItem(presetsKey)) || {};

// Corrección 2: Usar variable 'name' validada
function savePreset(presetName) {
    const name = presetName.trim();
    if (!name) return alert(translations.invalid_preset_name);
    if (presets[name]) return alert(translations.preset_exists);
    if (selectedDice.length === 0) return alert(translations.no_dice_to_save);
    
    presets[name] = selectedDice.slice();  // Usar name en lugar de presetName
    localStorage.setItem(presetsKey, JSON.stringify(presets));
    updatePresetSelector();
    alert(translations.preset_saved);
}

function loadPreset(presetName) {
    if (presets[presetName]) {
        selectedDice = presets[presetName].slice();
        updateDicePool();
        updateFillButton();
    }
}

function deletePreset(presetName) {
    if (confirm(translations.confirm_delete + ` "${presetName}"?`)) {
        delete presets[presetName];
        localStorage.setItem(presetsKey, JSON.stringify(presets));
        updatePresetSelector();
    }
}

function updatePresetSelector() {
    const presetSelect = document.getElementById('presetSelect');
    presetSelect.innerHTML = '<option value="">' + translations.select_preset + '</option>';
    
    Object.keys(presets).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        presetSelect.appendChild(option);
    });
}

// Initialize presets on load
updatePresetSelector();
document.addEventListener('DOMContentLoaded', () => {
    updateTranslations();
    updatePresetSelector();
});