// Initial state with an empty products array
import { FETCH_PRODUCTS_SUCCESS } from "../actions/types";

const initialState = {
  products: [],
};
// Reducer function to handle actions related to products

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
