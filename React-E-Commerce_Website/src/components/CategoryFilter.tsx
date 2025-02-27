
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../Api/Api";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

type CategoryParams = {
    category?: string;
};

export default function CategoryFilter() {
    const navigate = useNavigate();
    const { category } = useParams<CategoryParams>();

    const { data: categories = [] } = useQuery<string[]>({ queryKey: ["categories"], queryFn: getCategories });

    const handleCategoryChange = (selectedCategory: string) => {
        navigate(`/products/category/${selectedCategory}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{category || "Select Category"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={category || "All"} onValueChange={handleCategoryChange}>
                    <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                    {categories.map(cat => (
                        <DropdownMenuRadioItem key={cat} value={cat}>{cat}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}