const updateIcon = (enabled: boolean) => {
  chrome.browserAction.setIcon({ path: enabled ? "icon.png" : "icon-off.png" });
};

chrome.storage.sync.get(["enabled"], (result) => {
  updateIcon(result.enabled ?? true);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    updateIcon(changes.enabled.newValue ?? true);
  }
});
