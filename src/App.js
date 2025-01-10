// Import necessary libraries and components
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store.js";
import NavScrollExample from "./components/Navbar.jsx";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import "./assets/styles/App.css";
import CartPage from "./pages/CartPage.js";
import Footer from "./components/Footer.jsx";

function App() {
  // Manage selected category state
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    // Provide the Redux store to the app
    <Provider store={store}>
      <div className="App">
        {/* Router setup for navigation */}
        <Router>
          {/* Navbar with category selection */}
          <NavScrollExample setSelectedCategory={setSelectedCategory} />
          <div className="main-content">
            {/* Define routes */}
            <Routes>
              <Route
                path="/"
                element={<ProductList selectedCategory={selectedCategory} />}
              />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/CartPage" element={<CartPage />} />
            </Routes>
          </div>
          {/* Footer component */}
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
