

import { Box, Typography, Divider, Card, CardContent } from "@mui/material";
import { CartProductsProps } from "@/context/types";



const CartProducts = ({ cart }: CartProductsProps) => {
    return (
        <Box sx={{ marginBottom: 2 }}>

            <Divider sx={{ marginBottom: 2 }} />

            <Typography variant="h6" gutterBottom>Cart Details</Typography>
            <Typography variant="body1"><strong>Cart ID:</strong> {cart.id}</Typography>
            <Typography variant="body1"><strong>Total:</strong> <span style={{ color: "green" }}>${cart.total}</span></Typography>
            <Typography variant="body1"><strong>Discounted Total:</strong> <span style={{ color: "green" }}>${cart.discountedTotal}</span></Typography>
            <Typography variant="body1"><strong>Total Products:</strong> {cart.totalProducts}</Typography>
            <Typography variant="body1"><strong>Total Quantity:</strong> {cart.totalQuantity}</Typography>
            <Divider sx={{ marginY: 2 }} />


            <Typography variant="h6" gutterBottom>Products in Cart</Typography>
            <Box>

                {cart.products.map((product) => (
                    <Card key={product.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginY: 1, padding: 1, backgroundColor: "grey" }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="body1"><strong>{product.title}</strong></Typography>
                            <Typography variant="body2">Price: <span style={{ color: "#32CD32" }}>${product.price}</span></Typography>
                            <Typography variant="body2">Quantity: {product.quantity}</Typography>
                            <Typography variant="body2"><strong>Total:</strong> <span style={{ color: "#32CD32" }}>${product.discountedTotal}</span></Typography>
                        </CardContent>
                        <Box sx={{ width: 80, height: 80, marginRight: 2, flexShrink: 0 }}>
                            <img src={product.thumbnail} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }} />
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default CartProducts;
