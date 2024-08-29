// src/app/api/saveProduct.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const productData = req.body;

    // Handle storing the product data
    console.log("Product Data Received:", productData);

    // Respond back to the extension
    res.status(200).json({ message: 'Product data saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
