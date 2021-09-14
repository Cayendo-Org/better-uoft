import "./styles.scss";

const enabledCheckbox = document.getElementById("enabled") as HTMLInputElement;
const darkModeCheckbox = document.getElementById("darkMode") as HTMLInputElement;
const hueSlider = document.getElementById("hue") as HTMLInputElement;

enabledCheckbox.addEventListener("change", (event) => {
    chrome.storage.sync.set({ enabled: (event.target as HTMLInputElement).checked });
});

darkModeCheckbox.addEventListener("change", (event) => {
    chrome.storage.sync.set({ darkMode: (event.target as HTMLInputElement).checked });
});

hueSlider.addEventListener("change", (event) => {
    chrome.storage.sync.set({ hue: parseInt((event.target as HTMLInputElement).value) });
});

chrome.storage.sync.get(["enabled", "hue", "darkMode"], (result) => {
    enabledCheckbox.checked = result.enabled ?? true;
    hueSlider.value = result.hue ?? 200;
    darkModeCheckbox.checked = result.darkMode ?? true;
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        enabledCheckbox.checked = changes.enabled.newValue ?? true;
    }
    if (changes.hue) {
        hueSlider.value = changes.hue.newValue ?? 200;
    }
    if (changes.darkMode) {
        darkModeCheckbox.checked = changes.darkMode.newValue ?? true;
    }
});