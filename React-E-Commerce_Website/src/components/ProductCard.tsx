import { Card } from "../components/ui/card";
import { Link } from "react-router-dom";
import { IProduct } from "../Context/types";
import { Button } from "./ui/button";

interface ProductCardProps {
    product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="p-4">
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-2" />
            <h2 className="text-lg font-bold text-center">{product.title}</h2>
            <p className="text-green-600 text-center">${product.price}</p>
            <Link to={`/products/${product.id}`} className="text-blue-500 text-center">View Details</Link>
            <Link to={`/cart`} className="text-center">
                <Button variant="default" className="w-full">Add to Cart</Button>
            </Link>
        </Card>
    );
}

