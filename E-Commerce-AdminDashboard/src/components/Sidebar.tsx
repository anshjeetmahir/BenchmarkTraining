
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Home, ShoppingCart, People, Store, Menu, Comment, FormatQuote, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    if (isLoginPage) return null;

    const [open, setOpen] = useState(false);

    const toggleDrawer = (state: boolean) => () => {
        setOpen(state);
    };

    const menuItems = [
        { text: "Products", icon: <Home />, path: "/admin/products" },
        { text: "Cart", icon: <ShoppingCart />, path: "/admin/cart" },
        { text: "Users", icon: <People />, path: "/admin/users" },
        { text: "Orders", icon: <Store />, path: "/admin/orders" },
        { text: "Blog & Comments", icon: <Comment />, path: "/admin/blog-comment" },
        { text: "Quotes & Recipies", icon: <FormatQuote />, path: "/admin/quotes-recipes" },
        { text: "Logout", icon: <Logout />, path: "/admin/logout" },
    ];

    return (
        <>
            <IconButton onClick={toggleDrawer(true)} sx={{ position: "absolute", top: 20, left: 20 }}>
                <Menu />
            </IconButton>

            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
