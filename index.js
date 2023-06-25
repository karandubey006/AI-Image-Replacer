document.addEventListener("DOMContentLoaded", function() {
  var toggleSwitch = document.getElementById("toggle");

  // Retrieve the switch state from storage and update the toggle switch
  chrome.storage.sync.get(["contentScriptEnabled"], function(result) {
    toggleSwitch.checked = result.contentScriptEnabled;

    // Send message to background script to enable/disable the content script
    toggleSwitch.addEventListener("change", function() {
      var isChecked = toggleSwitch.checked;
      chrome.storage.sync.set({ contentScriptEnabled: isChecked });
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.runtime.sendMessage({ action: "toggleContentScript", enabled: isChecked }, function(response) {
          // Handle response from background script, if needed
        });
      });
    });
  });
});
