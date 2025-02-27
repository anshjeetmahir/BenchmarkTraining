
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../Api/Api";
import { IProduct } from "../Context/types";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const { data: products, isLoading, error } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: getAllProducts,
        retry: 2
    });

    if (isLoading || error) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="text-center">
                    {isLoading && <p className="text-2xl font-bold">Loading...</p>}
                    {error && <p className="text-2xl font-bold text-red-600">Error fetching products.</p>}
                </div>
            </div>
        );
    }



    return (
        <>

            <h1 className="text-center font-bold font-lg text-4xl mb-10">SHOP NOW</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}
