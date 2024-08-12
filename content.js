chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "analyze") {
        // This is where you'd implement the actual scraping logic
        // For now, we'll return mock data
        sendResponse({
            success: true,
            data: {
                name: "Eco-Friendly Water Bottle",
                description: "Reusable stainless steel water bottle",
                materials: {
                    "Stainless Steel": 90,
                    "Plastic": 10
                },
                carbonFootprint: 5.2,
                recycling: "Fully recyclable. Check local recycling guidelines for metal recycling.",
                alternatives: [
                    "Glass water bottle",
                    "Bamboo-based water bottle",
                    "Recycled plastic water bottle"
                ]
            }
        });
    }
});