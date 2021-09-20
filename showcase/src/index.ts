import "./styles.scss";

const darkModeButton = document.getElementById("darkMode") as HTMLButtonElement;
const huePrimarySlider = document.getElementById("primary-hue") as HTMLInputElement;
const huePaperSlider = document.getElementById("paper-hue") as HTMLInputElement;
const primaryStrengthSlider = document.getElementById("primary-strength") as HTMLInputElement;
const paperStrengthSlider = document.getElementById("paper-strength") as HTMLInputElement;

let darkMode = true;

darkModeButton.addEventListener("click", () => {
    darkMode = !darkMode;
    updateMode(darkMode);
});

primaryStrengthSlider.addEventListener("input", (event) => {
    updatePrimaryStrength(parseFloat((event.target as HTMLInputElement).value));
});

paperStrengthSlider.addEventListener("input", (event) => {
    updatePaperStrength(parseFloat((event.target as HTMLInputElement).value));
});

huePrimarySlider.addEventListener("input", (event) => {
    updateHuePrimary(parseInt((event.target as HTMLInputElement).value));
});

huePaperSlider.addEventListener("input", (event) => {
    updateHuePaper(parseInt((event.target as HTMLInputElement).value));
});

const updateMode = (darkMode: boolean) => {
    if (darkMode) {
        document.getElementsByTagName("HTML")[0].classList.add("uoft-dark-mode");
        darkModeButton.classList.add("on");
    } else {
        document.getElementsByTagName("HTML")[0].classList.remove("uoft-dark-mode");
        darkModeButton.classList.remove("on");
    }
};

const updateHuePrimary = (huePrimary: number) => {
    (document.getElementsByTagName("HTML")[0] as HTMLHtmlElement).style.setProperty("--hue-primary", huePrimary.toString());
};

const updateHuePaper = (huePaper: number) => {
    (document.getElementsByTagName("HTML")[0] as HTMLHtmlElement).style.setProperty("--hue-paper", huePaper.toString());
};

const updatePrimaryStrength = (primaryStrength: number) => {
    (document.getElementsByTagName("HTML")[0] as HTMLHtmlElement).style.setProperty("--primary-strength", primaryStrength.toString());
};

const updatePaperStrength = (paperStrength: number) => {
    (document.getElementsByTagName("HTML")[0] as HTMLHtmlElement).style.setProperty("--paper-strength", paperStrength.toString());
};

updateMode(darkMode);