document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const productSummary = document.getElementById('product-summary');
    const ecoScore = document.getElementById('eco-score');
    const materials = document.getElementById('materials');
    const carbonFootprint = document.getElementById('carbon-footprint');
    const recycling = document.getElementById('recycling');
    const alternatives = document.getElementById('alternatives');
    
    analyzeBtn.addEventListener('click', analyzeProduct);

    function analyzeProduct() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "analyze"}, function(response) {
                if (response && response.success) {
                    displayResults(response.data);
                } else {
                    displayError();
                }
            });
        });
    }

    function displayResults(data) {
        productSummary.innerHTML = `
            <h2 class="text-lg font-bold mb-2">${data.name}</h2>
            <p>${data.description}</p>
        `;

        const score = calculateEcoScore(data);
        ecoScore.innerHTML = `
            <h3 class="text-md font-semibold mb-2">Eco Score</h3>
            <div class="eco-meter" style="--score: ${score}"></div>
            <p class="text-center">${score}/100</p>
        `;

        displayMaterialsChart(data.materials);
        displayCarbonFootprint(data.carbonFootprint);
        displayRecyclingInfo(data.recycling);
        displayAlternatives(data.alternatives);
    }

    function calculateEcoScore(data) {
        // Implement your scoring algorithm here
        return Math.floor(Math.random() * 100); // Placeholder
    }

    function displayMaterialsChart(materials) {
        // Implement chart display using a library like Chart.js
    }

    function displayCarbonFootprint(footprint) {
        carbonFootprint.innerHTML = `
            <h3 class="text-md font-semibold mb-2">Carbon Footprint</h3>
            <p>${footprint} kg CO2e</p>
        `;
    }

    function displayRecyclingInfo(info) {
        recycling.innerHTML = `
            <h3 class="text-md font-semibold mb-2">Recycling Information</h3>
            <p>${info}</p>
        `;
    }

    function displayAlternatives(alternativesList) {
        alternatives.innerHTML = `
            <h3 class="text-md font-semibold mb-2">Eco-Friendly Alternatives</h3>
            <ul class="list-disc pl-5">
                ${alternativesList.map(alt => `<li>${alt}</li>`).join('')}
            </ul>
        `;
    }

    function displayError() {
        productSummary.innerHTML = '<p class="text-soft-orange">Unable to analyze this product. Please try again.</p>';
    }
});