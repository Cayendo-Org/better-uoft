import "./styles.scss";
import "../inject";

const enabledButton = document.getElementById("enabled") as HTMLBRElement;
const darkModeCButton = document.getElementById("darkMode") as HTMLBRElement;
const hueSlider = document.getElementById("hue") as HTMLInputElement;

enabledButton.addEventListener("click", () => {
    chrome.storage.sync.get(["enabled"], (result) => {
        chrome.storage.sync.set({ enabled: !(result.enabled ?? true) });
    });
});

darkModeCButton.addEventListener("click", () => {
    chrome.storage.sync.get(["darkMode"], (result) => {
        chrome.storage.sync.set({ darkMode: !(result.darkMode ?? true) });
    });
});

hueSlider.addEventListener("change", (event) => {
    chrome.storage.sync.set({ hue: parseInt((event.target as HTMLInputElement).value) });
});

chrome.storage.sync.get(["enabled", "hue", "darkMode"], (result) => {
    if(result.enabled ?? true){
        enabledButton.classList.add("on");
    } else {
        enabledButton.classList.remove("on");
    }
 
    hueSlider.value = result.hue ?? 200;

    if(result.darkMode ?? true){
        darkModeCButton.classList.add("on");
    }else{
        darkModeCButton.classList.remove("on");
    }
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        if (changes.enabled.newValue ?? true){
            enabledButton.classList.add("on");
        } else {
            enabledButton.classList.remove("on");
        }
    }

    if (changes.hue) {
        hueSlider.value = changes.hue.newValue ?? 200;
    }

    if (changes.darkMode) {
        if (changes.darkMode.newValue ?? true){
            darkModeCButton.classList.add("on");
        } else {
            darkModeCButton.classList.remove("on");
        }
    }
});