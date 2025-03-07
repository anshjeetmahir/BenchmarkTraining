import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteOrder } from "@/api/orderApi";
import { Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DeleteOrderButtonProps {
    orderId: number;
}

const DeleteOrderButton = ({ orderId }: DeleteOrderButtonProps) => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const deleteMutation = useMutation({
        mutationFn: () => deleteOrder(orderId),
        onSuccess: () => {
            setTimeout(() => navigate("/admin/orders"), 2000);
            setSnackbarMessage("Order Deleted Successfully!");
            setSnackbarOpen(true);
        },
        onError: () => {
            alert("Failed to delete the order!");
        },
        onSettled: () => {
            setIsDeleting(false);
        }
    });

    return (
        <>
            <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => {
                    setIsDeleting(true);
                    deleteMutation.mutate();
                }}
                disabled={isDeleting}
            >
                {isDeleting ? "Deleting..." : "Delete Order"}
            </Button>

            <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">{snackbarMessage}</Alert>
            </Snackbar>
        </>
    );
};

export default DeleteOrderButton;
