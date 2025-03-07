
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, fetchCategories, fetchProductsByCategory, addProduct } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";
import {
    Box,
    Stack,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Pagination,
    Typography,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IProduct, ICategory, SortOptions } from "@/context/types";




const sortReducer = (state: IProduct[], action: { type: SortOptions }): IProduct[] => {
    switch (action.type) {
        case SortOptions.PRICE_ASC:
            return [...state].sort((a, b) => a.price - b.price);
        case SortOptions.PRICE_DESC:
            return [...state].sort((a, b) => b.price - a.price);
        case SortOptions.TITLE_ASC:
            return [...state].sort((a, b) => a.title.localeCompare(b.title));
        case SortOptions.TITLE_DESC:
            return [...state].sort((a, b) => b.title.localeCompare(a.title));
        default:
            return state;
    }
};

const ProductPage = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState<SortOptions | "">("");
    const [openAdd, setOpenAdd] = useState(false);
    const [newProduct, setNewProduct] = useState<IProduct>({
        id: 0,
        title: "",
        price: 0,
        category: "",
        thumbnail: "",
    });
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const addMutation = useMutation({
        mutationFn: () => addProduct(newProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setOpenAdd(false);
            setAlertMessage("Product added successfully!");
        },
    });

    const { data: categories = [], error: categoriesError } = useQuery<ICategory[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const { data: products = [], isLoading: isProductsLoading, error: productsError } = useQuery<IProduct[]>(
        {
            queryKey: ["products", category],
            queryFn: () => (category ? fetchProductsByCategory(category) : fetchProducts()),
            refetchOnWindowFocus: false,
        }
    );

    if (productsError) {
        return <Typography color="error">Error fetching products: {productsError.message}</Typography>;
    }

    if (categoriesError) {
        return <Typography color="error">Error fetching categories: {categoriesError.message}</Typography>;
    }

    const categoryList = Array.isArray(categories) ? categories : [];

    const filteredProducts = useMemo(() => {
        let filtered = Array.isArray(products) ? [...products] : [];
        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return sortOrder ? sortReducer(filtered, { type: sortOrder }) : filtered;
    }, [products, searchTerm, sortOrder]);

    const productsPerPage = 6;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    return (
        <div style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}>

            <Box sx={{ width: "90%", p: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Typography sx={{ fontSize: "30px", marginBottom: "20px" }}>PRODUCTS</Typography>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: "60px", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                    <TextField
                        fullWidth
                        label="Search Products"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />

                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel>Category</InputLabel>
                        <Select value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}>
                            <MenuItem value="">All Categories</MenuItem>
                            {categoryList.map((cat) => (
                                <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value as SortOptions); setCurrentPage(1); }}>
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={SortOptions.PRICE_ASC}>Price: Low to High</MenuItem>
                            <MenuItem value={SortOptions.PRICE_DESC}>Price: High to Low</MenuItem>
                            <MenuItem value={SortOptions.TITLE_ASC}>Title: A-Z</MenuItem>
                            <MenuItem value={SortOptions.TITLE_DESC}>Title: Z-A</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAdd(true)}>
                        Add Product                     </Button>
                </Stack>





                <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={newProduct.title}
                            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            variant="outlined"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Thumbnail URL"
                            variant="outlined"
                            value={newProduct.thumbnail}
                            onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
                        <Button
                            onClick={() => addMutation.mutate()}
                            color="primary"
                            variant="contained"
                            disabled={addMutation.isPending}
                        >
                            {addMutation.isPending ? "Adding..." : "Add"}
                        </Button>
                    </DialogActions>
                </Dialog>




                {isProductsLoading ? (
                    <CircularProgress />
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(280px, 1fr))",
                            gap: 3,
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: "1200px",
                            width: "100%",
                        }}
                    >
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => <ProductCard key={product.id} product={product} />)
                        ) : (
                            <Typography sx={{ alignItems: "center" }}>No products found.</Typography>
                        )}
                    </Box>
                )}

                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <Pagination count={totalPages} page={currentPage} onChange={(_, value) => setCurrentPage(value)} />

                </Stack>
            </Box>


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
        </div>
    );
};

export default ProductPage;

