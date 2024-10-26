"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Dashboard() {
  const [gatheredData, setGatheredData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products/get-all-products");
       
        if (response.data.products) {
          setGatheredData(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold mb-4">Product List:</h1>
  {isLoading ? (
    <p className="text-lg">Loading...</p>
  ) : (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Price</th>
          <th className="border border-gray-300 px-4 py-2">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {gatheredData.length > 0 ? (
          gatheredData.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">${product.price}</td>
              <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="border border-gray-300 px-4 py-2 text-center">
              No products found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )}
</div>
  );
}
