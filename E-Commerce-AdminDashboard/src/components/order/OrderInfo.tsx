

import { Typography, Card, CardContent } from "@mui/material";

interface OrderInfoProps {
    order: {
        id: number;
        total: number;
        discountedTotal: number;
        totalProducts: number;
        totalQuantity: number;
    };
}

const OrderInfo = ({ order }: OrderInfoProps) => {
    return (
        <>

            <Card sx={{ marginY: 2 }}>
                <CardContent>
                    <Typography variant="body1"><strong>Order ID:</strong> {order.id}</Typography>
                    <Typography variant="body1"><strong>Total:</strong> <span style={{ color: "green" }}>${order.total}</span></Typography>
                    <Typography variant="body1"><strong>Discounted Total:</strong> <span style={{ color: "green" }}>${order.discountedTotal}</span></Typography>
                    <Typography variant="body1"><strong>Total Products:</strong> {order.totalProducts}</Typography>
                    <Typography variant="body1"><strong>Total Quantity:</strong> {order.totalQuantity}</Typography>

                </CardContent>
            </Card>




        </>
    );
};

export default OrderInfo;
