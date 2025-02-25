
import './App.css'

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { GlobalProvider } from "./Context/GlobalContext";
import Navbar from "./Components/Navbar";

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
