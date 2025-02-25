import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GlobalContext } from "../Context/GlobalContext";
import ProductCard from "../Components/ProductCard";
import { fetchProducts, fetchCategories } from "../Api/Api";
import "../Styles/home.css";



const Home: React.FC = () => {
    const context = useContext(GlobalContext);
    if (!context) return null;

    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        retry: false,
        refetchOnWindowFocus: false,

    });

    const { data: categories = [] } = useQuery<string[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((product: { category: string }) => product.category === selectedCategory);

    if (isLoading) return <h1 className="loading">Loading...</h1>;

    if (error) return <h1>{error.message}</h1>;
    return (
        <div className="home-container">
            <h1>Shop Now</h1>
            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} className="filter-container">
                <option value="all">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product: any) => <ProductCard key={product.id} productId={product.id} />)
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
