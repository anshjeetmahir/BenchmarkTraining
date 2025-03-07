
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { IAddCartPayload, AddCartDialogProps } from "@/context/types";



const AddCartDialog = ({ openDialog, setOpenDialog, addCartMutation, userId }: AddCartDialogProps) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [productId, setProductId] = useState<string>("");

    const handleAddCart = () => {
        if (!userId) return;

        const payload: IAddCartPayload = {
            userId,
            products: [{ id: Number(productId), quantity }],
        };

        addCartMutation.mutate(payload, {
            onSuccess: () => {
                setOpenDialog(false);
            },
        });
    };

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Add to Cart</DialogTitle>
            <DialogContent>
                <TextField label="User ID" type="number" fullWidth value={userId} onChange={(e) => setProductId(e.target.value)} margin="dense" disabled />
                <TextField label="Product ID" type="number" fullWidth value={productId} onChange={(e) => setProductId(e.target.value)} margin="dense" />
                <TextField label="Quantity" type="number" fullWidth value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} margin="dense" />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={handleAddCart} variant="contained" color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCartDialog;
