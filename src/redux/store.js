// Importing necessary functions to create the Redux store and combine reducers
import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";

// Combining reducers into a single rootReducer
const rootReducer = combineReducers({
  cart: cartReducer,
});

// Creating the Redux store with the rootReducer
const store = createStore(rootReducer);

export default store;
