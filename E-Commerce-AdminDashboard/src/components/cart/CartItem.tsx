import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartItemProps } from "@/context/types";



const CartItem = ({ cart }: CartItemProps) => {
    const navigate = useNavigate();

    return (
        <Card onClick={() => navigate(`/admin/cart/${cart.id}`)} sx={{ cursor: "pointer" }}>
            <CardContent>
                <Typography variant="h6">Cart ID: {cart.id}</Typography>
                <Typography>Total Items: {cart.totalProducts}</Typography>
                <Typography>Total Quantity: {cart.totalQuantity}</Typography>
                <Typography>
                    Total Price: <span style={{ color: "green" }}>${cart.discountedTotal}</span>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CartItem;
