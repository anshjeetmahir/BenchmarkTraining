import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface OrderCardProps {
    order: {
        id: number;
        totalQuantity: number;
        totalProducts: number;
        discountedTotal: number;
    };
    status: string;
    getStatusColor: (status: string) => string;
}

const OrderCard = ({ order, status, getStatusColor }: OrderCardProps) => {
    const navigate = useNavigate();

    return (
        <Card key={order.id} onClick={() => navigate(`/admin/orders/${order.id}`)} style={{ cursor: "pointer" }}>
            <CardContent>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography>Total Items: {order.totalQuantity}</Typography>
                <Typography>Total Products: {order.totalProducts}</Typography>
                <Typography>Total Amount: <span style={{ color: "green" }}>${order.discountedTotal}</span></Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", marginTop: "8px" }}>
                    Status: <span style={{ color: getStatusColor(status) }}>{status}</span>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default OrderCard;
