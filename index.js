document.addEventListener("DOMContentLoaded", function() {
  let toggleSwitch = document.getElementById("toggle");
  let selectElement = document.getElementById("selector");


  // Retrieve the switch state from storage and update the toggle switch
  chrome.storage.sync.get(["contentScriptEnabled"], function(result) {
    toggleSwitch.checked = result.contentScriptEnabled;
    selectElement.selectedIndex = result.mode;
    // Send message to background script to enable/disable the content script
    toggleSwitch.addEventListener("change", function() {
      let isChecked = toggleSwitch.checked;
      let mode = selectElement.selectedIndex;
      chrome.storage.sync.set({ contentScriptEnabled: isChecked, mode: mode });
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let activeTab = tabs[0];
        chrome.runtime.sendMessage({ action: "toggleContentScript", enabled: isChecked }, function(response) {
          // Handle response from background script, if needed
        });
      });
    });
  });
});
