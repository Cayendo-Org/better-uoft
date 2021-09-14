const updateMode = (on: boolean) => {
  if (on) {
    document.getElementsByTagName("HTML")[0].classList.add("uoft-dark-mode");
  } else {
    document.getElementsByTagName("HTML")[0].classList.remove("uoft-dark-mode");
  }
};

chrome.storage.sync.get(["on"], (result) => {
  updateMode(result.on);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.on) {
    updateMode(changes.on.newValue);
  }
});
