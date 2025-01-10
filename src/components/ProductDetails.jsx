import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import "../assets/styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to store the product data
  const [error, setError] = useState(null); // State to handle any errors while fetching data
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedImage, setSelectedImage] = useState(""); // State to store the image to be displayed in the modal
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const cartCount = useSelector((state) => state.cart.length); // Get the number of items in the cart from Redux state

  // Fetch product data when the component mounts or when the ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make an API call to get product details
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setProduct(json); // Set the fetched product data to state
      } catch (error) {
        setError(error.message); // Set error message in case of failure
      }
    };
    fetchProduct();
  }, [id]); // Re-run when the product ID changes

  // Handle error and loading states
  if (error) {
    return <p>Error fetching product: {error}</p>; // Display error message
  }

  if (!product) {
    return <p>Loading...</p>; // Display loading message until product data is fetched
  }

  // Handle opening and closing the modal
  const handleImageClick = () => {
    setSelectedImage(product.image); // Set the image to be displayed in the modal
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <Container className="productDetail-page">
      <Row>
        <Col md={6}>
          {/* Display product image */}
          <div className="productDetail-image-wrapper">
            <img
              src={product.image}
              alt={product.title}
              className="productDetail-image"
              onClick={handleImageClick} // Open modal on image click
            />
          </div>
        </Col>
        <Col md={6} className="mt-5">
          <div className="productDetail-info">
            {/* Display product title */}
            <h2>{product.title}</h2>
            {/* Display product description */}
            <p>{product.description}</p>
            {/* Display product category */}
            <p>Category: {product.category}</p>
            {/* Display product price */}
            <p>Price: ${product.price}</p>
            {/* Add to cart button */}
            <Button
              variant="primary"
              className="productDetail-add-to-cart-button"
              onClick={() => dispatch(addToCart(product))} // Dispatch addToCart action on button click
            >
              Add to Cart
            </Button>
            {/* Display number of items in the cart */}
            <p className="productDetail-cart-count">
              Items in Cart: {cartCount}
            </p>
          </div>
        </Col>
      </Row>

      {/* Modal for displaying image in full size */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Product"
            className="productDetail-modal-image"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetails;
