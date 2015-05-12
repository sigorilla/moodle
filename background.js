chrome.browserAction.onClicked.addListener(function (tab) {
  /*chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      console.log("Error: %o", chrome.extension.lastError.message);
    }
  });*/
});

chrome.runtime.onMessage.addListener(function (msg, sender) {
  console.log("MSG!");
  /* First, validate the message's structure */
  if ((msg.from === 'moodle') && (msg.subject === 'solve')) {
    /* Enable the page-action for the requesting tab */
    // chrome.pageAction.show(sender.tab.id);
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.extension.lastError) {
        console.log("Error: %o", chrome.extension.lastError.message);
      }
    });
  }
});
