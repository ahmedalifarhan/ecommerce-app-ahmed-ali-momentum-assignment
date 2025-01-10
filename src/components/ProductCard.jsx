import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import "../assets/styles/ProductCard.css";
import { FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  const navigate = useNavigate(); // Hook to navigate to product detail page
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store
  const [isAdding, setIsAdding] = useState(false); // State to manage adding product animation

  // Handle click to navigate to product detail page
  const handleClick = () => {
    navigate(`/product/${product.id}`); // Navigate to the product details page
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    setIsAdding(true); // Start adding animation
    setTimeout(() => {
      dispatch(addToCart(product)); // Dispatch action to add product to cart
      setIsAdding(false); // End adding animation
    }, 400); // Delay the action to match animation time
  };

  return (
    <div className={`product-card-wrapper ${isAdding ? "adding" : ""}`}>
      {/* Product Card */}
      <Card className="product-card">
        <div className="product-image-wrapper point" onClick={handleClick}>
          {/* Product image */}
          <Card.Img variant="top" src={product.image} />
        </div>
        <Card.Body>
          <Card.Title onClick={handleClick} className="product-title">
            {/* Product title */}
            {product.title}
          </Card.Title>
          <Card.Text className="product-price">
            {/* Product price */}${product.price}
          </Card.Text>
          <div className="add-to-cart-button-wrapper">
            {/* Add to cart button */}
            <Button
              className={`add-to-cart-button ${isAdding ? "adding" : ""}`}
              onClick={handleAddToCart}
            >
              <FaShoppingCart /> Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;
