import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Table, ButtonGroup, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  clearCart,
  removeFromCart,
  updateCartQuantity,
} from "../redux/actions/cartActions";
import "../assets/styles/CartPage.css";

function CartPage() {
  const cart = useSelector((state) => state.cart); // get the cart from redux store
  const dispatch = useDispatch(); // use dispatch to send actions to redux
  const [animateProductId, setAnimateProductId] = useState(null); // state to manage animation for quantity change
  const [showModal, setShowModal] = useState(false); // state for modal visibility
  const [modalImage, setModalImage] = useState(""); // state for modal image URL

  // function to clear the entire cart with confirmation
  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to clear the entire cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart()); // dispatch action to clear the cart
        Swal.fire("Cleared!", "Your cart has been cleared.", "success");
      }
    });
  };

  // function to remove a product from the cart with confirmation
  const handleRemoveFromCart = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this product from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(productId)); // dispatch action to remove product from cart
        Swal.fire("Removed!", "The product has been removed.", "success");
      }
    });
  };

  // function to increase the quantity of a product
  const handleIncreaseQuantity = (product) => {
    dispatch(updateCartQuantity(product, product.quantity + 1)); // dispatch action to increase quantity
    setAnimateProductId(product.id); // set product id for animation
    setTimeout(() => {
      setAnimateProductId(null); // reset animation after 500ms
    }, 500);
  };

  // function to decrease the quantity of a product
  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to decrease the quantity of this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, decrease it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateCartQuantity(product, product.quantity - 1)); // dispatch action to decrease quantity
          Swal.fire(
            "Decreased!",
            "The quantity has been decreased.",
            "success"
          );
        }
      });
    } else {
      Swal.fire("Error", "Quantity cannot be less than 1.", "error");
    }
  };

  // calculate the total price of the cart items
  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <Container>
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <Table striped bordered hover className="cart-table">
            <thead className="thead-dark">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.title}
                      width="50"
                      height="50"
                      className="product-image"
                      onClick={() => {
                        setModalImage(product.image);
                        setShowModal(true);
                      }}
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>
                    <ButtonGroup className="quantity-buttons">
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleDecreaseQuantity(product)}
                      >
                        -
                      </Button>
                      <span
                        className={`quantity ${
                          animateProductId === product.id ? "animate" : ""
                        }`}
                      >
                        {product.quantity}
                      </span>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleIncreaseQuantity(product)}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
          <Button variant="danger" className="mb-5" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </>
      ) : (
        <div className="empty-cart-message">
          <h3>Your cart is empty</h3>
          <p>
            Looks like you haven't added anything to your cart yet. Start
            shopping now to fill it up!
          </p>
        </div>
      )}

      {/* Modal for Image */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <img
            src={modalImage}
            alt="Large version"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CartPage;
