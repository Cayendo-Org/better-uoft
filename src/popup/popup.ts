import "../inject";
import "./styles.scss";

const enabledButton = document.getElementById("enabled") as HTMLButtonElement;
const darkModeButton = document.getElementById("darkMode") as HTMLButtonElement;
const hueSlider = document.getElementById("hue") as HTMLInputElement;

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

hueSlider.addEventListener("change", (event) => {
    chrome.storage.sync.set({ hue: parseInt((event.target as HTMLInputElement).value) });
});

chrome.storage.sync.get(["enabled", "hue", "darkMode"], (result) => {
    if (result.enabled ?? true) {
        enabledButton.classList.add("on");
        darkModeButton.disabled = false;
        hueSlider.disabled = false;
    } else {
        enabledButton.classList.remove("on");
        darkModeButton.disabled = true;
        hueSlider.disabled = true;
    }

    hueSlider.value = result.hue ?? 200;

    if (result.darkMode ?? true) {
        darkModeButton.classList.add("on");
    } else {
        darkModeButton.classList.remove("on");
    }
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        if (changes.enabled.newValue ?? true) {
            enabledButton.classList.add("on");
            darkModeButton.disabled = false;
            hueSlider.disabled = false;
        } else {
            enabledButton.classList.remove("on");
            darkModeButton.disabled = true;
            hueSlider.disabled = true;
        }
    }

    if (changes.hue) {
        hueSlider.value = changes.hue.newValue ?? 200;
    }

    if (changes.darkMode) {
        if (changes.darkMode.newValue ?? true) {
            darkModeButton.classList.add("on");
        } else {
            darkModeButton.classList.remove("on");
        }
    }
});