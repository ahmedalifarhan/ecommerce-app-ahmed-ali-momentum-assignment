// Action to handle successful fetching of products
import { FETCH_PRODUCTS_SUCCESS } from "./types";

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS, // Action type indicating successful product fetch
  payload: products, // The products fetched from the API
});
