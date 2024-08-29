// Function to scrape product data from Amazon's product page
function scrapeProductData() {
  const productData = {
      category: '',
      weight: '',
      screenSize: '',
      price: ''
  };

  // Scrape category
  const categoryElement = document.querySelector('input#twotabsearchtextbox');
  if (categoryElement) {
      productData.category = categoryElement.value.trim();  // Assuming category is value of search input
  } else {
      console.log('Category element not found');
  }

  // Scrape weight
  const weightRow = document.querySelector('tr:has(th.a-color-secondary.a-size-base.prodDetSectionEntry:contains("Item Weight"))');
  if (weightRow) {
      const weightValue = weightRow.querySelector('td.prodDetAttrValue');
      if (weightValue) {
          productData.weight = weightValue.textContent.trim();
      } else {
          console.log('Weight value not found');
      }
  } else {
      console.log('Weight row not found');
  }

  // Scrape screen size
  const screenSizeElement = document.querySelector('span.a-size-base.po-break-word');
  if (screenSizeElement) {
      productData.screenSize = screenSizeElement.textContent.trim();
  } else {
      console.log('Screen Size element not found');
  }

  // Scrape price
  const priceWholeElement = document.querySelector('span.a-price-whole');
  const priceDecimalElement = document.querySelector('span.a-price-decimal');
  if (priceWholeElement) {
      let price = priceWholeElement.textContent.trim();
      if (priceDecimalElement) {
          price += priceDecimalElement.textContent.trim();
      }
      productData.price = price;
  } else {
      console.log('Price element not found');
  }

  // Scrape screen size from title (additional)
  const titleElement = document.querySelector('#productTitle');
  if (titleElement) {
      const titleText = titleElement.textContent.trim();
      const screenSizeMatch = titleText.match(/(\d+(\.\d+)?)\s*inch/i);
      if (screenSizeMatch) {
          productData.screenSize = screenSizeMatch[1] + ' inch';
      } else {
          console.log('Screen Size not found in title');
      }
  } else {
      console.log('Title element not found');
  }

  return productData;
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeData") {
      const data = scrapeProductData();
      sendResponse({ data: data });
  }
});
