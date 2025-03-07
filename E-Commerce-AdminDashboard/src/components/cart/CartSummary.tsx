
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchCarts } from "../../api/cartApi";
import { ICart } from "@/context/types";



const CartSummary = () => {
    const { data: carts = [] } = useQuery<ICart[]>({ queryKey: ["carts"], queryFn: fetchCarts });


    const totalOrders: number = carts.length;
    const totalProducts: number = carts.reduce((acc: number, cart: ICart) => acc + cart.totalProducts, 0);
    const totalQuantity: number = carts.reduce((acc: number, cart: ICart) => acc + cart.totalQuantity, 0);
    const totalRevenue: number = carts.reduce((acc: number, cart: ICart) => acc + cart.discountedTotal, 0);

    return (
        <Card sx={{ p: 2, mb: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5">Cart Summary</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="h6">Total Orders: {totalOrders}</Typography>
                <Typography variant="h6">Total Products: {totalProducts}</Typography>
                <Typography variant="h6">Total Quantity: {totalQuantity}</Typography>
                <Typography variant="h6">
                    Total Revenue: <span style={{ color: "green" }}>${totalRevenue.toFixed(2)}</span>
                </Typography>


            </CardContent>
        </Card>
    );
};

export default CartSummary;
