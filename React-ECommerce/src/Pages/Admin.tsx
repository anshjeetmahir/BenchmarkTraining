import { GlobalContext } from "../Context/GlobalContext";
import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../Api/Api";
import { PRODUCT_URL } from "../Api/Api";
import axios from "axios";
import { useState } from "react";
import { IProduct } from "../Context/types";
import "../Styles/admin.css"

const Admin = () => {
    const context = useContext(GlobalContext);
    if (!context) return null;

    const [productData, setProductData] = useState<IProduct>({
        id: 0, title: "", price: 0, category: "", description: "", image: "", quantity: 0
    });
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

    const { data: products, refetch, isLoading, error } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: fetchProducts,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const addProductMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${PRODUCT_URL}`, productData);
            return response.data;
        },
        onSuccess: () => {
            alert("Product added successfully!");
            setProductData({ id: 0, title: "", price: 0, description: "", image: "", category: "", quantity: 0 });
        },
    });

    const editProductMutation = useMutation({
        mutationFn: async (updatedProduct: IProduct) => {
            const response = await axios.put(`${PRODUCT_URL}/${updatedProduct.id}`, updatedProduct);
            return response.data;
        },
        onSuccess: () => {
            alert("Product updated successfully!");
            setEditingProduct(null);
            setProductData({ id: 0, title: "", price: 0, description: "", image: "", category: "", quantity: 0 });
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`${PRODUCT_URL}/${id}`);
        },
        onSuccess: () => {
            alert("Product deleted successfully!");
            refetch();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!productData.title || !productData.price || !productData.description || !productData.image || !productData.category) {
            alert("All fields are required!");
            return;
        }

        if (editingProduct) {
            editProductMutation.mutate(productData);
        } else {
            addProductMutation.mutate();
        }
    };

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;

    return (
        <div className="admin-container-main">
            <div className="admin-container-admin">
                <h1>Admin Panel</h1>

                <form onSubmit={handleSubmit}>
                    <h2>Add New Product</h2>

                    <input type="text" placeholder="Title" value={productData.title} onChange={(e) => setProductData({ ...productData, title: e.target.value })} />

                    <input type="number" placeholder="Price" value={productData.price} onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })} />

                    <input type="text" placeholder="Description" value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />

                    <input type="text" placeholder="Image URL" value={productData.image} onChange={(e) => setProductData({ ...productData, image: e.target.value })} />

                    <input type="text" placeholder="Category" value={productData.category} onChange={(e) => setProductData({ ...productData, category: e.target.value })} />

                    <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>

                </form>
            </div>

            <div >
                <h2>Product List</h2>

                <ul className="product-list-admin" style={{ paddingRight: '60px' }}>
                    {products?.map((product) => (

                        <li key={product.id} className="product-card-admin" style={{ listStyle: 'none' }}>
                            <img src={product.image} alt={product.title} className="product-img-admin" />
                            <h4 style={{ color: 'black' }}>{product.title}</h4>
                            <p style={{ color: 'green', fontWeight: 'bold' }}>${product.price}</p>
                            <div className="product-buttons-admin">
                                <button onClick={() => deleteProductMutation.mutate(product.id)} className="delete-btn-admin">
                                    Delete
                                </button>
                                <button onClick={() => { setEditingProduct(product); setProductData(product); }} className="edit-btn-admin">
                                    Edit
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>

        </div>
    );
};

export default Admin;
