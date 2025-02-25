import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

const ProtectedRoute: React.FC = () => {
    const context = React.useContext(GlobalContext);
    if (!context) return null;


    return context.state.isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
