// Importing necessary function to combine multiple reducers
import { combineReducers } from "redux";
// Importing the individual reducers
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import searchReducer from "./searchReducer";

// Combining the individual reducers into a single rootReducer
const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  search: searchReducer,
});

export default rootReducer;
