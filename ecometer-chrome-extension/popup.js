// Fetch data from storage and update popup content
chrome.storage.local.get('productData', (result) => {
    const productData = result.productData || {};
    document.getElementById('category').textContent = productData.category || 'N/A';
    document.getElementById('weight').textContent = productData.weight || 'N/A';
    document.getElementById('screenSize').textContent = productData.screenSize || 'N/A';
    document.getElementById('price').textContent = productData.price || 'N/A';
});
