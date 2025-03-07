
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/productApi";
import { Box, CircularProgress, Typography, Card, CardMedia, Paper, Divider, Chip, Stack } from "@mui/material";
import { IProductDetail, IReview } from "@/context/types";




const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();

    const { data: product, isLoading, isError } = useQuery<IProductDetail>({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(Number(id)),
        enabled: !!id,
    });

    if (isLoading) {
        return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
    }

    if (isError || !product) {
        return <Typography variant="h6" color="error" align="center">Error loading product details.</Typography>;
    }

    return (
        <Box sx={{ maxWidth: "1200px", margin: "auto", mt: 4, p: 3 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                    {/* Left: Product Images */}
                    <Card sx={{ display: "grid", justifyContent: "center", p: 2 }}>
                        <CardMedia component="img" image={product.thumbnail} alt={product.title} sx={{ maxHeight: 300, objectFit: "contain", borderRadius: 2 }} />
                    </Card>

                    {/* Right: Product Details */}
                    <Box>
                        <Typography variant="h4" fontWeight="bold">{product.title}</Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>{product.brand}</Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>

                        <Typography variant="h5" sx={{ mt: 2, color: "green" }}>Price: ${product.price}</Typography>
                        <Typography variant="body2" sx={{ color: "red", mt: 1 }}>Discount: {product.discountPercentage}%</Typography>

                        <Typography variant="body1" sx={{ mt: 2 }}>Stock: {product.stock} units</Typography>
                        <Typography variant="body1">Category: {product.category}</Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>Rating: ⭐ {product.rating}</Typography>

                        <Divider sx={{ my: 2 }} />

                    </Box>
                </Box>


                <Box sx={{ mt: 4 }}>
                    <Divider>
                        <Chip label="Additional Details" variant="outlined" />
                    </Divider>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3, mt: 2 }}>
                        <Box>
                            <Typography variant="body1">Warranty: {product.warrantyInformation}</Typography>
                            <Typography variant="body1">Shipping: {product.shippingInformation}</Typography>
                            <Typography variant="body1">Return Policy: {product.returnPolicy}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1">Dimensions:</Typography>
                            <Typography variant="body2">Width: {product.dimensions.width} cm</Typography>
                            <Typography variant="body2">Height: {product.dimensions.height} cm</Typography>
                            <Typography variant="body2">Depth: {product.dimensions.depth} cm</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1">Tags:</Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                {product.tags.map((tag: string, index: number) => (
                                    <Chip key={index} label={tag} variant="outlined" />
                                ))}
                            </Stack>
                        </Box>
                    </Box>

                    {/* Reviews Section */}
                    <Divider sx={{ my: 3 }}>
                        <Chip label="Customer Reviews" variant="outlined" />
                    </Divider>

                    {product.reviews.length > 0 ? (
                        product.reviews.map((review: IReview, index: number) => (
                            <Paper key={index} elevation={2} sx={{ p: 2, mt: 2 }}>
                                <Typography variant="body1"><strong>{review.reviewerName}</strong> ⭐ {review.rating}/5</Typography>
                                <Typography variant="body2" color="text.secondary">{review.date}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>{review.comment}</Typography>
                            </Paper>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">No reviews yet.</Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default ProductDetail;
