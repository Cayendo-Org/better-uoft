document.getElementById("popup").addEventListener("click", () => {
  window.close();
  chrome.tabs.query({ active: true }, function (tabs) {
    let tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["saveTimetable.js"],
    });
  });
});
