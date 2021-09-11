const updateMode = (on, tab) => {
  chrome.tabs.executeScript(tab, {
    code: on
      ? 'document.getElementsByTagName("HTML")[0].classList.add("uoft-dark-mode");'
      : 'document.getElementsByTagName("HTML")[0].classList.remove("uoft-dark-mode");',
    runAt: "document_start",
  });
};

const updateIcon = (on) => {
  chrome.browserAction.setIcon({ path: on ? "icon.png" : "icon-off.png" });
};

const registerListener = (url, file) => {
  chrome.webNavigation.onCommitted.addListener(
    (details) => {
      chrome.tabs.insertCSS(details.tabId, {
        file: file,
        runAt: "document_start",
      });

      chrome.storage.sync.get(["on"], (result) => {
        updateMode(result.on, details.tabId);
      });

      chrome.storage.onChanged.addListener((changes, namespace) => {
        if (changes.on) {
          updateMode(changes.on.newValue, details.tabId);
        }
      });
    },
    { url: [{ hostPrefix: url }] }
  );
};

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.storage.sync.get(["on"], (result) => {
    chrome.storage.sync.set({ on: !result.on });
  });
});

chrome.storage.sync.get(["on"], (result) => {
  updateIcon(result.on);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.on) {
    updateIcon(changes.on.newValue);
  }
});

registerListener("acorn.utoronto.ca", "acorn/styles.css");
registerListener("q.utoronto.ca", "quercus/styles.css");
registerListener("idpz.utorauth.utoronto.ca", "weblogin/styles.css");
registerListener("weblogin.utoronto.ca", "weblogin/styles.css");
