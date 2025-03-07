
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Alert,
    Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductCardProps } from "@/context/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, updateProduct } from "../api/productApi";
import { useState } from "react";



const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [openEdit, setOpenEdit] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        title: product.title,
        price: product.price,
    });

    const [alertMessage, setAlertMessage] = useState<string | null>(null);


    const deleteMutation = useMutation({
        mutationFn: () => deleteProduct(product.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setAlertMessage("Product deleted successfully!");
        },
    });


    const editMutation = useMutation({
        mutationFn: () => updateProduct(product.id, editedProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setOpenEdit(false);
            setAlertMessage("Product updated successfully!");
        },
    });

    return (
        <>

            <Card sx={{ cursor: "pointer" }}>
                <Box
                    onClick={() => navigate(`${product.id}`)}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <CardMedia
                        component="img"
                        height="200"
                        image={product.thumbnail}
                        alt={product.title}
                        sx={{ objectFit: "contain" }}
                    />
                    <CardContent>
                        <Typography variant="h6">{product.title}</Typography>
                        <Typography variant="body2" color="green">
                            Price: ${product.price}
                        </Typography>
                    </CardContent>
                </Box>

                <Box display="flex" justifyContent="space-around" p={2}>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenEdit(true);
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteMutation.mutate();
                        }}
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </Button>
                </Box>

                <Dialog
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                >
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={editedProduct.title}
                            onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            variant="outlined"
                            type="number"
                            value={editedProduct.price}
                            onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenEdit(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => editMutation.mutate()}
                            color="primary"
                            variant="contained"
                            disabled={editMutation.isPending}
                        >
                            {editMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>


            <Snackbar
                open={Boolean(alertMessage)}
                autoHideDuration={3000}
                onClose={() => setAlertMessage(null)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setAlertMessage(null)} severity="success" variant="filled">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProductCard;
