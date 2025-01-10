import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/Header.css";
import { NavDropdown } from "react-bootstrap";

function NavScrollExample({ setSelectedCategory }) {
  // Get the cart count from the Redux store
  const cartCount = useSelector((state) => state.cart.length);
  const location = useLocation();
  const navigate = useNavigate(); // Used for navigation

  useEffect(() => {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");

    // Event listener for scroll to hide/show navbar
    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        navbar.style.top = "-80px"; // Hide navbar when scrolling down
      } else {
        navbar.style.top = "0"; // Show navbar when scrolling up
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }, []);

  // Function to handle category selection and navigate to home
  const handleCategorySelect = useCallback(
    (category) => {
      setSelectedCategory(category);
      navigate("/"); // Navigate to the homepage
    },
    [setSelectedCategory, navigate]
  );

  return (
    <Navbar
      id="navbar"
      expand="lg"
      className="bg-white fixed-top"
      style={{
        transition: "top 0.3s", // Smooth transition for navbar hiding/showing
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          {/* Logo section */}
          <img src={logo} alt="Flone" height="60" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="d-flex justify-content-between my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* Shopping link */}
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => setSelectedCategory("all")}
              className={`nav-link-custom ${
                location.pathname === "/" ? "active" : "" // Highlight active page
              }`}
            >
              Shopping
            </Nav.Link>
            {/* Categories dropdown */}
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => handleCategorySelect("electronics")}
              >
                Electronics
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleCategorySelect("jewelery")}
              >
                Jewelry
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleCategorySelect("men's clothing")}
              >
                Men's Clothing
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleCategorySelect("women's clothing")}
              >
                Women's Clothing
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        {/* Cart button with count */}
        <Button as={Link} to="/CartPage" variant="outline-success">
          <FaShoppingCart /> {cartCount}
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
