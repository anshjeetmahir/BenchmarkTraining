import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { IProduct } from "../Context/types";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../Api/Api";
import "../Styles/productCard.css";

interface IProps {
    productId: number;
}

const ProductCard: React.FC<IProps> = ({ productId }) => {
    const context = useContext(GlobalContext);
    if (!context) return null;
    const { dispatch } = context;


    const { data: product, isLoading, error } = useQuery<IProduct>({
        queryKey: ["product", productId.toString()],
        queryFn: () => fetchProduct(productId.toString()),
        retry: 2,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <p>Loading product...</p>;
    if (error) return <p>Error loading product</p>;

    return (
        <div className="product-card">
            <img src={product?.image} alt={product?.title} />
            <h3>{product?.title}</h3>
            <p>${product?.price}</p>
            <div className="cart-btn">
                <Link to={`/product/${product?.id}`}>View Details</Link>
                <button onClick={() => {
                    product && dispatch({ type: "ADD_TO_CART", payload: product });
                    alert('Item Added to Cart !!');
                }}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
