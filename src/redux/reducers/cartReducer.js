// Initial state is loaded from localStorage or set to an empty array if no cart is found
const initialState = JSON.parse(localStorage.getItem("cart")) || [];

// Cart reducer function to handle various cart actions
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle adding a product to the cart
    case "ADD_TO_CART":
      const productIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedState;
      if (productIndex !== -1) {
        // If product already exists, increase its quantity
        updatedState = state.map((item, index) =>
          index === productIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Otherwise, add the new product to the cart with quantity 1
        updatedState = [...state, { ...action.payload, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;

    // Handle removing a product from the cart
    case "REMOVE_FROM_CART":
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;

    // Handle clearing all items from the cart
    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return [];

    // Handle updating the quantity of a product in the cart
    case "UPDATE_CART_QUANTITY":
      const updatedCart = state.map((item) =>
        item.id === action.payload.product.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    // Default return state if no action matches
    default:
      return state;
  }
};

export default cartReducer;
