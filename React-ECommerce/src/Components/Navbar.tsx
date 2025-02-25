import React from "react";
import { Link } from "react-router-dom";
import '../Styles/navbar.css'

const Navbar: React.FC = () => {
    return (
        <>
            <nav>
                <h2>Anshjeet's E-Commerce</h2>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/admin-login">Admin Login</Link>
            </nav>
        </>
    );
};

export default Navbar;
