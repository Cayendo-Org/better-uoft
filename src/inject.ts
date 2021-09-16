const script_type = () => {
  if (chrome && chrome.extension && chrome.extension.getBackgroundPage && chrome.extension.getBackgroundPage() === window) {
    return 'BACKGROUND';
  } else if (chrome && chrome.extension && chrome.extension.getBackgroundPage && chrome.extension.getBackgroundPage() !== window) {
    return 'POPUP';
  } else if (!chrome || !chrome.runtime || !chrome.runtime.onMessage) {
    return 'WEB';
  } else {
    return 'CONTENT';
  }
};

const updateMode = (darkMode: boolean) => {
  if (darkMode) {
    document.getElementsByTagName("HTML")[0].classList.add("uoft-dark-mode");
  } else {
    document.getElementsByTagName("HTML")[0].classList.remove("uoft-dark-mode");
  }
};

const updateState = (enabled: boolean) => {
  if (enabled || script_type() === "POPUP") {
    document.getElementsByTagName("HTML")[0].classList.add("better-uoft");
  } else {
    document.getElementsByTagName("HTML")[0].classList.remove("better-uoft");
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

chrome.storage.sync.get(["enabled", "huePrimary", "huePaper", "darkMode"], (result) => {
  updateState(result.enabled ?? true);
  updateHuePrimary(result.huePrimary ?? 200);
  updateHuePaper(result.huePaper ?? 200);
  updatePrimaryStrength(result.primaryStrength ?? 1);
  updatePaperStrength(result.paperStrength ?? 0);
  updateMode(result.darkMode ?? true);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    updateState(changes.enabled.newValue ?? true);
  }

  if (changes.huePrimary) {
    updateHuePrimary(changes.huePrimary.newValue ?? 200);
  }

  if (changes.huePaper) {
    updateHuePaper(changes.huePaper.newValue ?? 200);
  }

  if (changes.darkMode) {
    updateMode(changes.darkMode.newValue ?? true);
  }

  if (changes.primaryStrength) {
    updatePrimaryStrength(changes.primaryStrength.newValue ?? 1);
  }

  if (changes.paperStrength) {
    updatePaperStrength(changes.paperStrength.newValue ?? 0);
  }
});
