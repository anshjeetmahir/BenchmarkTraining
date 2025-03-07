
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCartById, addCart, deleteCart } from "../../api/cartApi";
import { fetchUserById } from "../../api/userApi";
import { Box, Card, CardContent, Typography, CircularProgress, Divider } from "@mui/material";
import UserDetails from "../../components/cart/UserDetail";
import CartProducts from "../../components/cart/CartProducts";
import CartActions from "../../components/cart/CartActions";
import AddCartDialog from "../../components/cart/AddCartDialog";
import CartSnackbar from "../../components/cart/CartSnackbar";
import { ICartDetail, IUserDetail, IAddCartPayload } from "@/context/types";

const CartDetail = () => {
    const { id } = useParams();
    const cartId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const { data: cart, isLoading, error } = useQuery<ICartDetail | undefined>({
        queryKey: ["cart", cartId],
        queryFn: () => fetchCartById(cartId),
        enabled: !!cartId,
    });

    const { data: user } = useQuery<IUserDetail | undefined>({
        queryKey: ["user", cart?.userId],
        queryFn: () => (cart?.userId ? fetchUserById(cart.userId) : Promise.reject("No user ID")),
        enabled: !!cart?.userId,
    });

    const addCartMutation = useMutation({
        mutationFn: (payload: IAddCartPayload) => addCart(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carts"] });
            setSnackbarMessage("Item added to Cart Successfully!");
            setSnackbarOpen(true);
            setOpenDialog(false);
        },
    });

    const deleteCartMutation = useMutation({
        mutationFn: () => deleteCart(cartId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["carts"] });
            setTimeout(() => navigate("/admin/cart"), 3000);
            setSnackbarMessage("Cart Deleted Successfully!");
            setSnackbarOpen(true);
        },
    });

    if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
    if (error) return <Typography color="error">Error loading cart details.</Typography>;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
            <Card sx={{ width: "100%", maxWidth: 800, padding: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom textAlign="center">Cart Details</Typography>
                    <Divider sx={{ marginBottom: 2 }} />

                    {user && <UserDetails user={user} />}


                    {cart && <CartProducts cart={cart} />}


                    {cart && <CartActions setOpenDialog={setOpenDialog} deleteCartMutation={deleteCartMutation} userId={cart.userId} />}
                </CardContent>
            </Card>


            <AddCartDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                addCartMutation={addCartMutation}
                userId={cart?.userId}
            />


            <CartSnackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} snackbarMessage={snackbarMessage} />
        </Box>
    );
};

export default CartDetail;
