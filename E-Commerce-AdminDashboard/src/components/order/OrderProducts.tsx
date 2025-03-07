
import { Card, CardContent, Box, Typography } from "@mui/material";
import { IOrderProduct } from "@/context/types";

interface OrderProductsProps {
    products: IOrderProduct[];
}

const OrderProducts = ({ products }: OrderProductsProps) => {
    return (
        <Box>
            <Typography variant="h6">Products</Typography>
            {products.map((product) => (
                <Card
                    key={product.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginY: 1,
                        padding: 1,
                        backgroundColor: "grey"
                    }}
                >
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="body1"><strong>{product.title}</strong></Typography>
                        <Typography variant="body2">Price: <span style={{ color: "#32CD32" }}>${product.price}</span></Typography>
                        <Typography variant="body2">Quantity: {product.quantity}</Typography>
                        <Typography variant="body2"><strong>Total:</strong><span style={{ color: "#32CD32" }}>${product.total}</span></Typography>
                    </CardContent>
                    <Box sx={{ width: 80, height: 80, marginRight: 2, flexShrink: 0 }}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }}
                        />
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default OrderProducts;
