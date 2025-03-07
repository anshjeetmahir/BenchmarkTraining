

import { Box, Button } from "@mui/material";
import { CartActionsProps } from "@/context/types";


const CartActions = ({ setOpenDialog, deleteCartMutation }: CartActionsProps) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>


            <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                Add Item to Cart
            </Button>

            <Button
                variant="contained"
                color="error"
                onClick={() => deleteCartMutation.mutate()}
                disabled={deleteCartMutation.isPending}
            >
                {deleteCartMutation.isPending ? "Deleting..." : "Delete Cart"}
            </Button>
        </Box>
    );
};

export default CartActions;
