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

const updateHue = (hue: number) => {
  (document.getElementsByTagName("HTML")[0] as HTMLHtmlElement).style.setProperty("--hue-primary", hue.toString());
};

chrome.storage.sync.get(["enabled", "hue", "darkMode"], (result) => {
  updateState(result.enabled ?? true);
  updateHue(result.hue ?? 200);
  updateMode(result.darkMode ?? true);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    updateState(changes.enabled.newValue ?? true);
  }
  if (changes.hue) {
    updateHue(changes.hue.newValue ?? 200);
  }
  if (changes.darkMode) {
    updateMode(changes.darkMode.newValue ?? true);
  }
});
