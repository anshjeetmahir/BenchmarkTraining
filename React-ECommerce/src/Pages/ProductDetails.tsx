import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../Api/Api";
import { useParams } from "react-router-dom";
import { IProduct } from "../Context/types";
import { GlobalContext } from "../Context/GlobalContext";
import "../Styles/productDetail.css";


interface IRating extends IProduct {
    rating: {
        rate: number;
        count: number;
    };
}

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const context = useContext(GlobalContext);
    if (!context) return null;
    const { dispatch } = context;

    const { data: product, isLoading, error } = useQuery<IRating>({
        queryKey: ["product", id],
        queryFn: async () => {
            const data = await fetchProduct(id!);
            return data as IRating;
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;

    return (
        <div className="product-detail-container">
            <div className="product-image">
                <img src={product?.image} alt={product?.title} />
            </div>
            <div className="product-info">
                <h2>{product?.title}</h2>
                <p className="category">Category: {product?.category}</p>
                <p className="description">{product?.description}</p>
                <p className="price">Price: ${product?.price}</p>
                {product?.rating && (
                    <p className="rating">
                        Rating: ⭐ {product.rating.rate} ({product.rating.count} reviews)
                    </p>
                )}
                <button onClick={() => { product && dispatch({ type: "ADD_TO_CART", payload: product }); alert('Item Added to Cart !!') }}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;

