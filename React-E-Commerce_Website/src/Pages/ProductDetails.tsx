
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../Api/Api";
import { useParams } from "react-router-dom";
import { IProduct, ICartItem } from "../Context/types";
import { ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useCartStore } from "../Context/CartSrore";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const productId = id ? parseInt(id, 10) : null;

    const { data: product, isLoading, error } = useQuery<IProduct>({
        queryKey: ["product", productId],
        queryFn: async () => {
            if (!productId) throw new Error("Invalid product ID");
            const data = await getProductById(productId);
            if (!data || Object.keys(data).length === 0) {
                throw new Error("Product not found.");
            }
            return data as IProduct;
        },
        enabled: !!productId,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const addToCart = useCartStore((state) => state.addToCart);

    if (isLoading || error) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="text-center">
                    {isLoading && <p className="text-2xl font-bold">Loading...</p>}
                    {error && <p className="text-2xl font-bold text-red-600">Error fetching product.</p>}
                </div>
            </div>
        );
    }

    if (!product) {
        console.error("Product is undefined in ProductDetails");
        return null;
    }

    const cartProduct: ICartItem = { ...product, quantity: 1 };

    return (
        <div className="p-10">
            <ResizablePanelGroup direction="horizontal" className="w-full">
                <ResizablePanel defaultSize={40} className="flex items-center justify-center">
                    <Card className="p-4 h-[80vh]">
                        <CardContent>
                            <img src={product.image} alt={product.title} className="w-full h-auto object-fit rounded-lg" />
                        </CardContent>
                    </Card>
                </ResizablePanel>

                <ResizablePanel defaultSize={60} className="p-6">
                    <h2 className="text-3xl font-bold">{product.title}</h2>
                    <p className="text-gray-500 text-lg">Category: {product.category}</p>
                    <p className="text-gray-700 mt-2">{product.description}</p>
                    <p className="text-green-700 text-xl font-semibold mt-4">Price: ${product.price}</p>

                    <p className="text-yellow-500 mt-2">
                        ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
                    </p>

                    <Button variant="default" className="mt-6 w-full cursor-pointer" onClick={() => addToCart(cartProduct)}>
                        Add to Cart
                    </Button>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default ProductDetails;
