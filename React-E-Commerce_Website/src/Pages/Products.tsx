import { useQuery } from "@tanstack/react-query";
import { getCategories, getFilteredProducts } from "../Api/Api";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get("category") || "All";
    const limit = searchParams.get("limit") || "10";
    const sort = searchParams.get("sort") || "asc";

    const { data: categories = [] } = useQuery<string[]>({ queryKey: ["categories"], queryFn: getCategories });

    const { data: products, isLoading, error } = useQuery({
        queryKey: ["products", category, limit, sort],
        queryFn: () => getFilteredProducts(category !== "All" ? category : undefined, Number(limit), sort),
    });

    const handleParamChange = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products</div>;

    return (
        <div className="p-6">
            <div className="flex gap-4 mb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">{category}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={category} onValueChange={(val) => handleParamChange("category", val)}>
                            <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                            {categories.map(cat => (
                                <DropdownMenuRadioItem key={cat} value={cat}>{cat}</DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Limit: {limit}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={limit} onValueChange={(val) => handleParamChange("limit", val)}>
                            {["5", "10", "15", "20"].map(val => (
                                <DropdownMenuRadioItem key={val} value={val}>{val}</DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Sort: {sort === "asc" ? "Low to High" : "High to Low"}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={sort} onValueChange={(val) => handleParamChange("sort", val)}>
                            <DropdownMenuRadioItem value="asc">Low to High</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="desc">High to Low</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {products?.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

