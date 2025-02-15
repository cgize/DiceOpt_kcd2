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
    "Aranka's Die": "./img/die_f_icon.png",
    "Cautious Cheater's Die": "./img/die_b_icon.png",
    "Ci Die": "./img/die_r_icon.png",
    "Devil's Head Die": "./img/die_r_devil_icon.png",
    "Die of Misfortune": "./img/die_c_icon.png",
    "Even Die": "./img/die_i_icon.png",
    "Favorable Die": "./img/die_j_icon.png",
    "Fer Die": "./img/die_r_icon.png",
    "Greasy Die": "./img/die_g_icon.png",
    "Grimy Die": "./img/die_e_icon.png",
    "Grozav's Lucky Die": "./img/die_m_icon.png",
    "Heavenly Kingdom Die": "./img/die_kcd_icon.png",
    "Holy Trinity Die": "./img/die_g_icon.png",
    "Hugo's Die": "./img/die_h_icon.png",
    "King's Die": "./img/die_k_icon.png",
    "Lousy Gambler's Die": "./img/die_d_icon.png",
    "Lu Die": "./img/die_r_icon.png",
    "Lucky Die": "./img/die_o_icon.png",
    "Mathematician's Die": "./img/die_j_icon.png",
    "Molar Die": "./img/die_c_icon.png",
    "Odd Die": "./img/die_k_icon.png",
    "Ordinary Die": "./img/die_g_icon.png",
    "Painted Die": "./img/die_l_icon.png",
    "Pie Die": "./img/die_p_icon.png",
    "Premolar Die": "./img/die_c_icon.png",
    "Sad Greaser's Die": "./img/die_q_icon.png",
    "Saint Antiochus' Die": "./img/die_q_icon.png",
    "Shrinking Die": "./img/die_h_icon.png",
    "St. Stephen's Die": "./img/die_g_icon.png",
    "Strip Die": "./img/die_o_icon.png",
    "Three Die": "./img/die_r_icon.png",
    "Unbalanced Die": "./img/die_b_icon.png",
    "Unlucky Die": "./img/die_e_icon.png",
    "Wagoner's Die": "./img/die_a_icon.png",
    "Weighted Die": "./img/die_f_icon.png",
    "Normal Die": "./img/die_g_icon.png"
};

// Sistema de selección de dados
const dieSelect = document.getElementById('dieSelect');
const searchInput = document.createElement('input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('placeholder', translations.search_dice);
searchInput.classList.add('search-input');
dieSelect.parentNode.insertBefore(searchInput, dieSelect);

// Función para poblar opciones de dados
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

// Búsqueda con debounce mejorado
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => populateDiceOptions(e.target.value), 300);
});

// Estado de dados seleccionados
let selectedDice = [];

// Función para añadir dados
function addDie() {
    const dieName = dieSelect.value;
    if (diceDB.hasOwnProperty(dieName)) {
        selectedDice.push(dieName);
        updateDicePool();
    }
}

// Función para limpiar dados
function clearDice() {
    selectedDice = [];
    updateDicePool();
}

// Función para eliminar dado específico
function removeDie(index) {
    if (index >= 0 && index < selectedDice.length) {
        selectedDice.splice(index, 1);
        updateDicePool();
    }
}

// Actualizar visualización de dados
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
                <tr>${diceDB[die].map(p => `<td>${p?.toFixed?.(1) ?? '0.0'}%</td>`).join('')}</tr>
            </table>
        </div>
    `).join('');
}

// Sistema de presets
const presetsKey = 'dicePresets';
let presets = JSON.parse(localStorage.getItem(presetsKey)) || {};

// Guardar preset validado
function savePreset(presetName) {
    const name = presetName.trim();
    if (!name) return alert(translations.invalid_preset_name);
    if (presets[name]) return alert(translations.preset_exists);
    if (selectedDice.length === 0) return alert(translations.no_dice_to_save);
    
    presets[name] = selectedDice.slice();
    localStorage.setItem(presetsKey, JSON.stringify(presets));
    updatePresetSelector();
    alert(translations.preset_saved);
}

// Cargar preset con validación
function loadPreset(presetName) {
    if (presets[presetName]) {
        selectedDice = [...presets[presetName]];
        updateDicePool();
    }
}

// Eliminar preset con confirmación
function deletePreset(presetName) {
    if (presets[presetName] && confirm(`${translations.confirm_delete} "${presetName}"?`)) {
        delete presets[presetName];
        localStorage.setItem(presetsKey, JSON.stringify(presets));
        updatePresetSelector();
    }
}

// Actualizar selector de presets
function updatePresetSelector() {
    const presetSelect = document.getElementById('presetSelect');
    if (!presetSelect) return;
    
    presetSelect.innerHTML = `<option value="">${translations.select_preset}</option>`;
    Object.keys(presets).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        presetSelect.appendChild(option);
    });
}

// Inicialización completa
document.addEventListener('DOMContentLoaded', () => {
    populateDiceOptions();
    updatePresetSelector();
    if (typeof updateTranslations === 'function') updateTranslations();
});