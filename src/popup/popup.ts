import "../inject";
import "./styles.scss";

const enabledButton = document.getElementById("enabled") as HTMLButtonElement;
const darkModeButton = document.getElementById("darkMode") as HTMLButtonElement;
const advancedModeButton = document.getElementById("advancedMode") as HTMLButtonElement;
const advancedModePanel = document.getElementById("advanced-panel") as HTMLDivElement;
const huePrimarySlider = document.getElementById("primary-hue") as HTMLInputElement;
const huePaperSlider = document.getElementById("paper-hue") as HTMLInputElement;
const primaryStrengthSlider = document.getElementById("primary-strength") as HTMLInputElement;
const paperStrengthSlider = document.getElementById("paper-strength") as HTMLInputElement;

enabledButton.addEventListener("click", () => {
    chrome.storage.sync.get(["enabled"], (result) => {
        chrome.storage.sync.set({ enabled: !(result.enabled ?? true) });
    });
});

darkModeButton.addEventListener("click", () => {
    chrome.storage.sync.get(["darkMode"], (result) => {
        chrome.storage.sync.set({ darkMode: !(result.darkMode ?? true) });
    });
});

advancedModeButton.addEventListener("click", () => {
    chrome.storage.sync.get(["advancedMode"], (result) => {
        chrome.storage.sync.set({ advancedMode: !(result.advancedMode ?? false) });
    });
});

primaryStrengthSlider.addEventListener("change", (event) => {
    chrome.storage.sync.set({ primaryStrength: parseFloat((event.target as HTMLInputElement).value) });
});

paperStrengthSlider.addEventListener("change", (event) => {
    chrome.storage.sync.set({ paperStrength: parseFloat((event.target as HTMLInputElement).value) });
});

huePrimarySlider.addEventListener("change", (event) => {
    chrome.storage.sync.set({ huePrimary: parseInt((event.target as HTMLInputElement).value) });
});

huePaperSlider.addEventListener("change", (event) => {
    chrome.storage.sync.set({ huePaper: parseInt((event.target as HTMLInputElement).value) });
});

chrome.storage.sync.get(["enabled", "darkMode", "advancedMode", "huePrimary", "huePaper"], (result) => {
    if (result.enabled ?? true) {
        enabledButton.classList.add("on");
        darkModeButton.disabled = false;
        huePrimarySlider.disabled = false;
        huePaperSlider.disabled = false;
        primaryStrengthSlider.disabled = false;
        paperStrengthSlider.disabled = false;
        advancedModeButton.disabled = false;
    } else {
        enabledButton.classList.remove("on");
        darkModeButton.disabled = true;
        huePrimarySlider.disabled = true;
        huePaperSlider.disabled = true;
        primaryStrengthSlider.disabled = true;
        paperStrengthSlider.disabled = true;
        advancedModeButton.disabled = true;
        chrome.storage.sync.set({ advancedMode: false });
    }

    if (result.darkMode ?? true) {
        darkModeButton.classList.add("on");
    } else {
        darkModeButton.classList.remove("on");
    }

    if (result.advancedMode ?? false) {
        advancedModePanel.classList.add("on");
        advancedModeButton.classList.add("on");
    } else {
        advancedModePanel.classList.remove("on");
        advancedModeButton.classList.remove("on");
    }

    huePrimarySlider.value = result.huePrimary ?? 200;
    huePaperSlider.value = result.huePaper ?? 200;
    primaryStrengthSlider.value = result.primaryStrength ?? 1;
    paperStrengthSlider.value = result.paperStrength ?? 0;
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        if (changes.enabled.newValue ?? true) {
            enabledButton.classList.add("on");
            darkModeButton.disabled = false;
            huePrimarySlider.disabled = false;
            huePaperSlider.disabled = false;
            primaryStrengthSlider.disabled = false;
            paperStrengthSlider.disabled = false;
            advancedModeButton.disabled = false;
        } else {
            enabledButton.classList.remove("on");
            darkModeButton.disabled = true;
            huePrimarySlider.disabled = true;
            huePaperSlider.disabled = true;
            primaryStrengthSlider.disabled = true;
            paperStrengthSlider.disabled = true;
            advancedModeButton.disabled = true;
            advancedModePanel.classList.remove("on");
            chrome.storage.sync.set({ advancedMode: false });
        }
    }

    if (changes.advancedMode) {
        if (changes.advancedMode.newValue ?? false) {
            advancedModePanel.classList.add("on");
            advancedModeButton.classList.add("on");
        } else {
            advancedModePanel.classList.remove("on");
            advancedModeButton.classList.remove("on");
        }
    }

    if (changes.darkMode) {
        if (changes.darkMode.newValue ?? true) {
            darkModeButton.classList.add("on");
        } else {
            darkModeButton.classList.remove("on");
        }
    }

    if (changes.huePrimary) {
        huePrimarySlider.value = changes.huePrimary.newValue ?? 200;
    }

    if (changes.huePaper) {
        huePaperSlider.value = changes.huePaper.newValue ?? 200;
    }

    if (changes.primaryStrength) {
        primaryStrengthSlider.value = changes.primaryStrength.newValue ?? 1;
    }

    if (changes.paperStrength) {
        paperStrengthSlider.value = changes.paperStrength.newValue ?? 0;
    }
});