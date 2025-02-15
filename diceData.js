// diceData.js
const diceDB = {
    "Aranka's Die": [28.6,4.8,28.6,4.8,28.6,4.8],
    "Cautious Cheater's Die": [23.8,14.3,9.5,14.3,23.8,14.3],
    "Ci Die": [13.0,13.0,13.0,13.0,13.0,34.8],
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

// Función para mostrar la lista completa de dados al hacer clic en el campo de búsqueda o el ícono de búsqueda
function showAllDice() {
    let dropdown = document.getElementById("diceDropdown");
    dropdown.innerHTML = ""; // Limpiar lista anterior

    Object.keys(diceDB).forEach(name => {
        let option = document.createElement("div");

        let icon = document.createElement("img");
        icon.src = diceImages[name] || "./img/default_icon.png"; // Ícono por defecto

        let text = document.createElement("span");
        text.textContent = name;

        option.appendChild(icon);
        option.appendChild(text);
        option.onclick = () => selectDie(name);
        dropdown.appendChild(option);
    });

    dropdown.style.display = "block";
}

// Función para alternar la lista de dados (mostrar todo o filtrar)
function toggleDiceDropdown(event) {
    event.stopPropagation(); // Evita que el evento cierre la lista inmediatamente
    let dropdown = document.getElementById("diceDropdown");

    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        showAllDice(); // Mostrar todos los dados al abrir
    }
}

// Función para filtrar los dados en la lista en tiempo real
function filterDice() {
    let input = document.getElementById("searchDice").value.toLowerCase();
    let dropdown = document.getElementById("diceDropdown");

    dropdown.innerHTML = ""; // Limpiar opciones previas

    Object.keys(diceDB)
        .filter(name => name.toLowerCase().includes(input))
        .forEach(name => {
            let option = document.createElement("div");

            let icon = document.createElement("img");
            icon.src = diceImages[name] || "./img/default_icon.png"; // Ícono por defecto

            let text = document.createElement("span");
            text.textContent = name;

            option.appendChild(icon);
            option.appendChild(text);
            option.onclick = () => selectDie(name);
            dropdown.appendChild(option);
        });

    dropdown.style.display = "block";
}

// Función para seleccionar un dado y cerrar la lista
function selectDie(name) {
    document.getElementById("searchDice").value = name;
    document.getElementById("diceDropdown").style.display = "none";
}

// Cierra la lista si el usuario hace clic fuera de la barra de búsqueda y del menú desplegable
document.addEventListener("mousedown", function(event) {
    const dropdown = document.getElementById("diceDropdown");
    const searchBox = document.getElementById("searchDice");
    const searchIcon = document.getElementById("searchIcon");

    if (!searchBox.contains(event.target) && !dropdown.contains(event.target) && !searchIcon.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

// Estado de los dados seleccionados
let selectedDice = [];

// Función para añadir dados seleccionados a la lista
function addDie() {
    const dieName = document.getElementById("searchDice").value;
    if (diceDB.hasOwnProperty(dieName)) {
        selectedDice.push(dieName);
        updateDicePool();
    }
}

// Función para limpiar la lista de dados seleccionados
function clearDice() {
    selectedDice = [];
    updateDicePool();
}

// Función para eliminar un dado específico de la lista
function removeDie(index) {
    if (index >= 0 && index < selectedDice.length) {
        selectedDice.splice(index, 1);
        updateDicePool();
    }
}

// Función para actualizar la visualización de los dados seleccionados
function updateDicePool() {
    const pool = document.getElementById("dicePool");
    pool.innerHTML = selectedDice.map((die, index) => `
        <div class="die-details">
            <button class="remove-btn" onclick="removeDie(${index})">×</button>
            <div class="die-title">
                <img src="${diceImages[die]}" class="die-icon-small" alt="${die}" title="${die}">
                ${die}
            </div>
        </div>
    `).join("");
}

// Sistema de presets
const presetsKey = 'dicePresets';
let presets = JSON.parse(localStorage.getItem(presetsKey)) || {};

// Función para guardar un preset con validaciones básicas
function savePreset() {
    const presetName = prompt(translations.enter_preset_name || "Enter preset name:");
    if (presetName) {
        savePresetLogic(presetName);
    }
}

// Lógica para guardar presets en localStorage
function savePresetLogic(presetName) {
    const name = presetName.trim();
    if (!name) return alert(translations.invalid_preset_name || "Invalid preset name");
    if (presets[name]) return alert(translations.preset_exists || "Preset already exists");
    if (selectedDice.length === 0) return alert(translations.no_dice_to_save || "No dice to save");

    presets[name] = selectedDice.slice();
    localStorage.setItem(presetsKey, JSON.stringify(presets));
    updatePresetSelector();
    alert(translations.preset_saved || "Preset saved");
}

// Función para cargar un preset guardado
function loadPreset(presetName) {
    if (presets[presetName]) {
        selectedDice = [...presets[presetName]];
        updateDicePool();
    }
}

// Función para eliminar un preset con confirmación
function deletePreset(presetName) {
    if (presets[presetName] && confirm(`${translations.confirm_delete || "Are you sure you want to delete"} "${presetName}"?`)) {
        delete presets[presetName];
        localStorage.setItem(presetsKey, JSON.stringify(presets));
        updatePresetSelector();
    }
}

// Función para actualizar la lista de presets en la interfaz
function updatePresetSelector() {
    const presetSelect = document.getElementById('presetSelect');
    if (!presetSelect) return;
    
    presetSelect.innerHTML = `<option value="">${translations.select_preset || "Select a preset"}</option>`;
    Object.keys(presets).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        presetSelect.appendChild(option);
    });
}

// Función para aplicar traducciones dinámicas a los elementos con data-i18n
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = translations[key]; // Aplica traducción a los placeholders
            } else {
                el.textContent = translations[key];
            }
        }
    });

    // Traducción dinámica de la sección de combinaciones
    const scoringContainer = document.querySelector('.scoring-rules');
    if (scoringContainer) {
        scoringContainer.innerHTML = `
            <h3>${translations.how_we_choose}</h3>
            ${translations.simulation_steps.map(step => `
                <div class="scoring-rule">${step}</div>
            `).join('')}
        `;
    }

    updatePresetSelector();
}

// Inicialización de la página y eventos
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchDice").addEventListener("click", toggleDiceDropdown);
    document.getElementById("searchIcon").addEventListener("click", function(event) {
        event.stopPropagation();
        toggleDiceDropdown();
    });

    applyTranslations();
    populateDiceOptions();
    updatePresetSelector();
});
