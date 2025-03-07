import { Snackbar, Alert } from "@mui/material";

const CartSnackbar = ({
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
}: {
    snackbarOpen: boolean;
    setSnackbarOpen: (open: boolean) => void;
    snackbarMessage: string;
}) => {
    return (
        <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
            <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
};

export default CartSnackbar;
