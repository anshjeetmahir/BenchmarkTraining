
import { Card } from "../components/ui/card";
import { Link } from "react-router-dom";

import { ProductCardProps, ICartItem } from "../Context/types";
import { Button } from "./ui/button";
import { useCartStore } from "../Context/CartSrore";



export default function ProductCard({ product }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    if (!product) {
        console.error("Product is undefined in ProductCard");
        return null;
    }


    const cartProduct: ICartItem = { ...product, quantity: 1 };

    return (
        <Card className="p-4">
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-2" />
            <h2 className="text-lg font-bold text-center">{product.title}</h2>
            <p className="text-green-600 text-center">${product.price}</p>
            <Link to={`/products/${product.id}`} className="text-blue-500 text-center">View Details</Link>
            <Button variant="default" className="w-full mt-2 cursor-pointer" onClick={() => addToCart(cartProduct)}>
                Add to Cart
            </Button>
        </Card>
    );
}
