import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Api/Api";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";
import "../styles/adminLogin.css";

const AdminLogin: React.FC = () => {
    const context = useContext(GlobalContext);
    if (!context) return null;
    const { dispatch } = context;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password,
            });
            if (response.data.token) {

                dispatch({ type: "LOGIN_ADMIN", payload: response.data.token });
                navigate("/admin");



            }
        } catch (err) {
            setError("Invalid Credentials");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="login-container">
                <h1>Admin Login</h1>
                {error && <p className="error">{error}</p>}
                <div className="inputs">

                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default AdminLogin;
