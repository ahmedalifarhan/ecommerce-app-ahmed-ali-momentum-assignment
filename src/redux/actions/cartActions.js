// actions/cartActions.js

// Action to add a product to the cart
export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART", // Action type
    payload: product, // Product to be added
  };
};

// Action to remove a product from the cart by product ID
export const removeFromCart = (productId) => {
  return {
    type: "REMOVE_FROM_CART", // Action type
    payload: productId, // Product ID to be removed
  };
};

// Action to clear the entire cart
export const clearCart = () => {
  return {
    type: "CLEAR_CART", // Action type
  };
};

// Action to update the quantity of a product in the cart
export const updateCartQuantity = (product, quantity) => {
  return {
    type: "UPDATE_CART_QUANTITY", // Action type
    payload: { product, quantity }, // Product and the new quantity
  };
};
