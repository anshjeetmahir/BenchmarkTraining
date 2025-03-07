
import { fetchOrderById } from "@/api/orderApi";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import OrderProducts from "../../components/order/OrderProducts";
import UserInfo from "../../components/order/UserInfo";
import OrderInfo from "../../components/order/OrderInfo";
import DeleteOrderButton from "../../components/order/DeleteOrderButton";
import OrderStatus from "@/components/order/OrderStatus";
import { useOrderStore } from "@/store/orderStore";




const OrderDetail = () => {
    const { id } = useParams();
    const orderId = Number(id);
    const { statuses, setStatus } = useOrderStore();


    const { data: order, error, isLoading } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => fetchOrderById(orderId),
        enabled: Boolean(orderId),
    });

    if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
    if (error) return <Alert severity="error">{error.message}</Alert>;
    if (!order) return <Alert severity="warning">Order not found</Alert>;

    return (
        <Box sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Order Details
            </Typography>


            <OrderInfo order={order} />


            <UserInfo userId={order.userId} />


            <OrderStatus orderId={order.id} currentStatus={statuses[order.id] || "Pending"} setStatus={setStatus} />


            <OrderProducts products={order.products} />


            <DeleteOrderButton orderId={order.id} />
        </Box>
    );
};

export default OrderDetail;
