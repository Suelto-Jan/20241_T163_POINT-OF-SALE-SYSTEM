import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import userImage from "./Images/UserProfile.jpg";
import backgroundImage from "./Images/pci.jpg";

// Styled components setup
const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #c18383;
  padding: 20px;
`;

const LeftPanel = styled.div`
  flex: 1;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  position: relative;
  padding: 20px;
  color: #fff;
  font-family: Arial, sans-serif;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333;
  border-radius: 10px;
  padding: 20px;
  color: #fff;
`;

const ProductDetails = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #fff;
`;

// Main component
const ScanPage = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);

  // Function to fetch product data from the backend
  const fetchProductData = async (scannedBarcode) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${scannedBarcode}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setProduct(null);
    }
  };

  // Handle barcode input
  const handleBarcodeInput = (event) => {
    if (event.key === "Enter") {
      fetchProductData(barcode);
      setBarcode("");
    } else {
      setBarcode((prev) => prev + event.key);
    }
  };

  // Listen for barcode input when the component is loaded
  useEffect(() => {
    window.addEventListener("keydown", handleBarcodeInput);
    return () => {
      window.removeEventListener("keydown", handleBarcodeInput);
    };
  }, [barcode]);

  return (
    <PageContainer>
      <LeftPanel>
        {/* Left panel content (e.g., user profile) */}
      </LeftPanel>
      <RightPanel>
        <h2>Scanned Product</h2>
        {product ? (
          <ProductDetails>
            <img src={product.imageUrl} alt="Product" width="150" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </ProductDetails>
        ) : (
          <p>Scan a product to see details here.</p>
        )}
      </RightPanel>
    </PageContainer>
  );
};

export default ScanPage;