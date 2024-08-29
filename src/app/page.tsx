'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const data = urlParams.get('data');
      if (data) {
        const parsedData = JSON.parse(decodeURIComponent(data));
        console.log("Parsed Data:", parsedData);  // Debugging
        setProductData(parsedData);
      }
    } catch (error) {
      console.error("Error parsing product data:", error);
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-4xl font-bold mb-4">EcoMeter Product Analysis</h1>

      {productData ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p><strong>Category:</strong> {productData.category}</p>
          <p><strong>Weight:</strong> {productData.weight}</p>
          <p><strong>Screen Size:</strong> {productData.screenSize}</p>
          <p><strong>Price:</strong> {productData.price}</p>
        </div>
      ) : (
        <p>No product data available. Please use the Chrome extension on an Amazon product page.</p>
      )}
    </div>
  );
}
