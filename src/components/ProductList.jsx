import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Dropdown } from "react-bootstrap";
import ProductCard from "./ProductCard";
import "../assets/styles/ProductList.css";
import ControlledCarousel from "./ControlledCarousel";

function ProductList({ selectedCategory }) {
  const [products, setProducts] = useState([]); // State to store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products based on category and sort
  const [error, setError] = useState(null); // State to store any error message

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products"); // API call
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setProducts(json); // Store fetched products
        setFilteredProducts(json); // Initialize with all products
      } catch (error) {
        setError(error.message); // Store any error
      }
    };
    fetchProducts(); // Call the function to fetch products
  }, []); // Run once when the component is mounted

  useEffect(() => {
    // Filter products based on selected category
    if (selectedCategory === "all") {
      setFilteredProducts(products); // Show all products if "all" category is selected
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory) // Filter based on category
      );
    }
  }, [selectedCategory, products]); // Run when selectedCategory or products change

  const sortProducts = (type) => {
    // Sort products based on the selected type (price or title)
    const sortedProducts = [...filteredProducts];
    if (type === "price") {
      sortedProducts.sort((a, b) => a.price - b.price); // Sort by price
    } else if (type === "title") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title
    }
    setFilteredProducts(sortedProducts); // Update filtered products
  };

  const styles = {
    container: {
      height: "850px",
      background: "#f0e0ff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
      position: "relative",
    },
    image: {
      position: "absolute",
      right: "0",
      bottom: "0",
      maxWidth: "50%",
      objectFit: "contain",
    },
    textContainer: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      width: "50%",
    },
    h1: {
      margin: "0",
      textAlign: "left",
      fontSize: "4vw",
    },
    filterSortContainer: {
      display: "flex",
      alignItems: "end",
      justifyContent: "center",
      gap: "10px",
      margin: "0 auto",
      position: "relative",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1,
    },
    dropdownMenu: {
      zIndex: 2, // Dropdown menu stays on top
    },
  };

  return (
    <React.Fragment>
      {/* Hero Section with Image and Title */}
      <ControlledCarousel />
      {/* Features Section */}
      <div className="features text-center pt-5 pb-5">
        <div className="container">
          <div className="main-title mt-5 mb-5 position-relative">
            <img className="mb-4" src="images/title.png" alt="" />
            <h2>We are Good at</h2>
            <p className="text-black-50">
              Some of these things we specialize in
            </p>
          </div>
          <Row>
            {/* Feature 1: Free Shipping */}
            <Col md={6} lg={3}>
              <div className="feat">
                <div className="icon-holder d-inline-flex align-items-center">
                  <i className="fa fa-truck fa-2x me-2"></i>{" "}
                  <h4 className="mb-3 mt-3">Free Shipping</h4>
                </div>
                <p className="text-black-50 lh-larg">
                  Enjoy free shipping on all orders, no hidden fees.
                </p>
              </div>
            </Col>

            {/* Feature 2: Customer Support */}
            <Col md={6} lg={3}>
              <div className="feat">
                <div className="icon-holder d-inline-flex align-items-center">
                  <i className="fa-solid fa-headset fa-2x me-2"></i>{" "}
                  <h4 className="mb-3 mt-3">Customer Support</h4>
                </div>
                <p className="text-black-50 lh-larg">
                  24/7 support to help you with any questions or concerns.
                </p>
              </div>
            </Col>

            {/* Feature 3: Exclusive Offers */}
            <Col md={6} lg={3}>
              <div className="feat">
                <div className="icon-holder d-inline-flex align-items-center">
                  <i className="fa-solid fa-gift fa-2x me-2"></i>{" "}
                  <h4 className="mb-3 mt-3">Exclusive Offers</h4>
                </div>
                <p className="text-black-50 lh-larg">
                  Get special offers and discounts only for our loyal customers.
                </p>
              </div>
            </Col>

            {/* Feature 4: Easy Returns */}
            <Col md={6} lg={3}>
              <div className="feat">
                <div className="icon-holder d-inline-flex align-items-center">
                  <i className="fa-solid fa-sync fa-2x me-2"></i>{" "}
                  <h4 className="mb-3 mt-3">Easy Returns</h4>
                </div>
                <p className="text-black-50 lh-larg">
                  Hassle-free returns within 30 days for a smooth shopping
                  experience.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Daily Deals Section */}
      <h2 className="main-title-section">Daily Deals!</h2>

      {/* Sort Options Section */}
      <div className="sort-options text-center">
        <div style={styles.filterSortContainer}>
          <Dropdown className="d-inline">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu style={styles.dropdownMenu}>
              <Dropdown.Item onClick={() => sortProducts("price")}>
                Price
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortProducts("title")}>
                Title
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Product List Section */}
      <div>
        <Container className="mt-4">
          <Row className="gx-3">
            {error ? (
              <p>Error fetching products: {error}</p>
            ) : (
              filteredProducts.map((product) => (
                <Col key={product.id} md={4} className="mb-3">
                  <ProductCard product={product} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ProductList;
