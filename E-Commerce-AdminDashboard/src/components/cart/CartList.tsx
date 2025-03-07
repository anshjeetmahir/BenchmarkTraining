import { Box, CircularProgress } from "@mui/material";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";
import CartPagination from "./CartPagination";
import { CartListProps } from "@/context/types";


const CartList = ({ carts, isLoading, page, itemsPerPage, setPage }: CartListProps) => {
    if (isLoading) return <CircularProgress />;

    const totalPages = Math.ceil(carts.length / itemsPerPage);
    const paginatedCarts = carts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <>
            <CartSummary />

            <Box display="grid" gridTemplateColumns="repeat(3, minmax(300px, 1fr))" gap={2}>
                {paginatedCarts.map((cart) => (
                    <CartItem key={cart.id} cart={cart} />
                ))}
            </Box>

            {totalPages > 1 && <CartPagination totalPages={totalPages} page={page} setPage={setPage} />}
        </>
    );
};

export default CartList;
