chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes('amazon.com')) {
    chrome.tabs.sendMessage(tab.id, { action: 'scrapeProduct' }, (response) => {
      console.log('Product info:', response);
      // Here you would send the data to your server for ML processing
    });
  }
});