"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

const Cards = () => {
    const [gatheredData, setGatheredData] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/products/get-all-products");
            if (response.data.products) {
                setGatheredData(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gatheredData.map((product) => (
                <div
                    key={product._id}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                    <a href="#">
                        <img
                            className="p-8 rounded-t-lg"
                            src="/docs/images/products/default-product.png"
                            alt={`${product.name} image`}
                        />
                    </a>
                    <div className="px-5 pb-5">
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {product.name}
                            </h5>
                        </a>
                        <div className="flex items-center mt-2.5 mb-5">
                            <div className="flex items-center space-x-1">
                                {/* Add star SVG icons or ratings here */}
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                5.0
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                ${product.price}
                            </span>
                            <a
                                href="#"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add to cart
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
