import React, { Fragment, useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import "../index.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductList = (props) => {
  const { products, user } = props.context;

  // State to track the input value
  const [searchQuery, setSearchQuery] = useState("");
  // State to hold filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      // Make POST API call here, replace 'YOUR_API_ENDPOINT' with your actual endpoint
      const response = await fetch("http://127.0.0.1:8086/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      console.log(data)
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handler for input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Effect to fetch data from API when searchQuery changes
  useEffect(() => {
    // Call fetchData when searchQuery changes
    fetchData();
  }, [searchQuery]); // useEffect will re-run whenever searchQuery changes

  // Function to refresh data when button is clicked
  const handleRefreshClick = () => {
    fetchData();
  };

  return (
    <Fragment>
      <div className="hero qss">
        <div className="hero-body container">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Chercher par nom..."
                value={searchQuery}
                onChange={handleInputChange} // Call handleInputChange on change
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div id="b6" className="column columns is-multiline">
          {filteredProducts.length ? (
            filteredProducts.map((product, index) => (
              <ProductItem
                product={product}
                user={user}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No product found!
              </span>
            </div>
          )}
        </div>
      </div>
      <button onClick={handleRefreshClick}>Refresh</button> {/* Button to refresh data */}
    </Fragment>
  );
};

export default withContext(ProductList);
