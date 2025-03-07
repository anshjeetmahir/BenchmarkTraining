
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarts } from "../../api/cartApi";
import { Box, Typography } from "@mui/material";
import CartList from "../../components/cart/CartList";
import { ICart } from "@/context/types";

const Cart = () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const { data: carts = [], isLoading, error } = useQuery<ICart[]>({
        queryKey: ["carts"],
        queryFn: fetchCarts,
    });

    if (error) return <p>Error loading carts</p>;

    return (
        <Box textAlign="center" padding="20px">
            <Typography variant="h4" sx={{ marginBottom: "30px" }}>
                Cart Management
            </Typography>

            <CartList carts={carts} isLoading={isLoading} page={page} itemsPerPage={itemsPerPage} setPage={setPage} />
        </Box>
    );
};

export default Cart;
