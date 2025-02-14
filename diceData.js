// diceData.js
const diceDB = {
    "Aranka's Die": [28.6, 4.8, 28.6, 4.8, 28.6, 4.8],
    "Cautious Cheater's Die": [23.8, 14.3, 9.5, 14.3, 23.8, 14.3],
    "Ci Die": [13.0, 13.0, 13.0, 13.0, 13.0, 34.8],
    "Devil's Head Die": [16.7, 16.7, 16.7, 16.7, 16.7, 16.7],
    "Die of Misfortune": [4.5, 22.7, 22.7, 22.7, 22.7, 4.5],
    "Even Die": [6.7, 26.7, 6.7, 26.7, 6.7, 26.7],
    "Favorable Die": [33.3, 0.0, 5.6, 5.6, 33.3, 22.2],
    "Fer Die": [13.0, 13.0, 13.0, 13.0, 13.0, 34.8],
    "Greasy Die": [17.6, 11.8, 17.6, 11.8, 17.6, 23.5],
    "Grimy Die": [6.3, 31.3, 6.3, 6.3, 43.8, 6.3],
    "Grozav's Lucky Die": [6.7, 66.7, 6.7, 6.7, 6.7, 6.7],
    "Heavenly Kingdom Die": [36.8, 10.5, 10.5, 10.5, 10.5, 21.1],
    "Holy Trinity Die": [18.2, 22.7, 45.5, 4.5, 4.5, 4.5],
    "Hugo's Die": [16.7, 16.7, 16.7, 16.7, 16.7, 16.7],
    "King's Die": [12.5, 18.8, 21.9, 25.0, 12.5, 9.4],
    "Lousy Gambler's Die": [10.0, 15.0, 10.0, 15.0, 35.0, 15.0],
    "Lu Die": [13.0, 13.0, 13.0, 13.0, 13.0, 34.8],
    "Lucky Die": [27.3, 4.5, 9.1, 13.6, 18.2, 27.3],
    "Mathematician's Die": [16.7, 20.8, 25.0, 29.2, 4.2, 4.2],
    "Molar Die": [16.7, 16.7, 16.7, 16.7, 16.7, 16.7],
    "Odd Die": [26.7, 6.7, 26.7, 6.7, 26.7, 6.7],
    "Ordinary Die": [16.7, 16.7, 16.7, 16.7, 16.7, 16.7],
    "Painted Die": [18.8, 6.3, 6.3, 6.3, 43.8, 18.8],
    "Pie Die": [46.2, 7.7, 23.1, 23.1, 0.0, 0.0],
    "Premolar Die": [16.7, 16.7, 16.7, 16.7, 16.7, 16.7],
    "Sad Greaser's Die": [26.1, 26.1, 4.3, 4.3, 26.1, 13.0],
    "Saint Antiochus' Die": [0.0, 0.0, 100.0, 0.0, 0.0, 0.0],
    "Shrinking Die": [22.2, 11.1, 11.1, 11.1, 11.1, 33.3],
    "St. Stephen's Die": [16.7, 16.7, 16.7, 16.7, 16.7, 16.7],
    "Strip Die": [25.0, 12.5, 12.5, 12.5, 18.8, 18.8],
    "Three Die": [12.5, 6.3, 56.3, 6.3, 12.5, 6.3],
    "Unbalanced Die": [25.0, 33.3, 8.3, 8.3, 16.7, 8.3],
    "Unlucky Die": [9.1, 27.3, 18.2, 18.2, 18.2, 9.1],
    "Wagoner's Die": [5.6, 27.8, 33.3, 11.1, 11.1, 11.1],
    "Weighted Die": [66.7, 6.7, 6.7, 6.7, 6.7, 6.7],
    "Normal Die": [16.7, 16.7, 16.7, 16.7, 16.7, 16.7]
};

const diceImages = {
    "Aranka's Die": "img/dice/die_f.png",
    "Cautious Cheater's Die": "img/dice/die_b.png",
    "Ci Die": "img/dice/die_r.png",
    "Devil's Head Die": "img/dice/die_devil.png",
    "Die of Misfortune": "img/dice/die_c.png",
    "Even Die": "img/dice/die_i.png",
    "Favorable Die": "img/dice/die_j.png",
    "Fer Die": "img/dice/die_r.png",
    "Greasy Die": "img/dice/die_g.png",
    "Grimy Die": "img/dice/die_e.png",
    "Grozav's Lucky Die": "img/dice/die_m.png",
    "Heavenly Kingdom Die": "img/dice/die_heaven.png",
    "Holy Trinity Die": "img/dice/die_holy.png",
    "Hugo's Die": "img/dice/die_h.png",
    "King's Die": "img/dice/die_k.png",
    "Lousy Gambler's Die": "img/dice/die_d.png",
    "Lu Die": "img/dice/die_r.png",
    "Lucky Die": "img/dice/die_lucky.png",
    "Mathematician's Die": "img/dice/die_math.png",
    "Molar Die": "img/dice/die_molar.png",
    "Odd Die": "img/dice/die_odd.png",
    "Ordinary Die": "img/dice/die_ordinary.png",
    "Painted Die": "img/dice/die_painted.png",
    "Pie Die": "img/dice/die_pie.png",
    "Premolar Die": "img/dice/die_premolar.png",
    "Sad Greaser's Die": "img/dice/die_sad.png",
    "Saint Antiochus' Die": "img/dice/die_saint.png",
    "Shrinking Die": "img/dice/die_shrink.png",
    "St. Stephen's Die": "img/dice/die_stephen.png",
    "Strip Die": "img/dice/die_strip.png",
    "Three Die": "img/dice/die_three.png",
    "Unbalanced Die": "img/dice/die_unbalanced.png",
    "Unlucky Die": "img/dice/die_unlucky.png",
    "Wagoner's Die": "img/dice/die_wagon.png",
    "Weighted Die": "img/dice/die_weighted.png",
    "Normal Die": "img/dice/die_normal.png"
};

// Sistema de selección de dados
const dieSelect = document.getElementById('dieSelect');
const searchInput = document.querySelector('.search-input') || document.createElement('input');

if (!document.querySelector('.search-input')) {
    searchInput.className = 'search-input';
    searchInput.placeholder = translations.search_dice;
    dieSelect.parentNode.insertBefore(searchInput, dieSelect);
}

// Búsqueda con debounce
let searchTimeout;
searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => populateDiceOptions(e.target.value), 300);
});

function populateDiceOptions(filter = '') {
    dieSelect.innerHTML = '';
    Object.keys(diceDB)
        .filter(name => name.toLowerCase().includes(filter.toLowerCase()))
        .forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            dieSelect.appendChild(option);
        });
}

// Gestión de dados seleccionados
let selectedDice = [];

function addDie() {
    const die = dieSelect.value;
    if (diceDB[die] && selectedDice.length < 6) {
        selectedDice.push(die);
        updateDicePool();
        updateFillButton();
    }
}

function removeDie(index) {
    selectedDice.splice(index, 1);
    updateDicePool();
    updateFillButton();
}

function clearDice() {
    selectedDice = [];
    updateDicePool();
    updateFillButton();
}

function updateDicePool() {
    const pool = document.getElementById('dicePool');
    pool.innerHTML = selectedDice.map((die, index) => `
        <div class="die-card">
            <button class="remove-btn" onclick="removeDie(${index})">&times;</button>
            <img src="${diceImages[die]}" 
                 class="die-preview" 
                 alt="${die}" 
                 title="${die}">
            <div class="die-stats">
                ${diceDB[die].map((p, i) => `
                    <div class="die-face">
                        <span>${i + 1}</span>
                        <progress value="${p}" max="100"></progress>
                        <span>${p.toFixed(1)}%</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Sistema de presets
const presetsKey = 'diceOptimizerPresets';
let presets = JSON.parse(localStorage.getItem(presetsKey)) || {};

function savePreset(name) {
    const presetName = name.trim();
    if (!presetName) return alert(translations.invalid_preset_name);
    if (presets[presetName]) return alert(translations.preset_exists);
    if (selectedDice.length === 0) return alert(translations.no_dice_to_save);
    
    presets[presetName] = selectedDice.slice();
    localStorage.setItem(presetsKey, JSON.stringify(presets));
    updatePresetSelector();
}

function loadPreset(name) {
    if (presets[name]) {
        selectedDice = [...presets[name]];
        updateDicePool();
        updateFillButton();
    }
}

function deletePreset(name) {
    if (presets[name] && confirm(translations.confirm_delete)) {
        delete presets[name];
        localStorage.setItem(presetsKey, JSON.stringify(presets));
        updatePresetSelector();
    }
}

function updatePresetSelector() {
    const presetSelect = document.getElementById('presetSelect');
    presetSelect.innerHTML = `<option value="">${translations.select_preset}</option>`;
    
    Object.keys(presets).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        presetSelect.appendChild(option);
    });
}

// Completa con dados normales
function updateFillButton() {
    const fillCount = 6 - selectedDice.length;
    const fillButton = document.getElementById('fillDice');
    
    if (fillCount > 0) {
        fillButton.style.display = 'inline-block';
        document.getElementById('fillCount').textContent = fillCount;
    } else {
        fillButton.style.display = 'none';
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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    populateDiceOptions();
    updatePresetSelector();
    updateFillButton();
    if (typeof applyTranslations === 'function') applyTranslations();
});