chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("amazon.com")) {
      chrome.tabs.sendMessage(tab.id, { action: "scrapeData" }, (response) => {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
          }
          if (response && response.data) {
              chrome.tabs.create({ url: "http://localhost:3000?data=" + encodeURIComponent(JSON.stringify(response.data)) });
          }
      });
  } else {
      console.log("This is not an Amazon product page.");
  }
});
