"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [gatheredData, setGatheredData] = useState(null); // Updated initial state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await axios.get("/api/products/get-all-products");
        setGatheredData(getData.data); // Update state with the fetched data
        console.log(getData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <h1>Product List: </h1>
    </div>
  );
}
