import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllProducts, deleteProduct } from "../Api/Api";
import { IProduct } from "../Context/types";
import ModifyCard from "../components/ModifyCard";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "../components/ui/alert-dialog";

export default function ModifyProducts() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [isDeleteOpen, setDeleteOpen] = useState(false);

    const { data: products = [], isLoading, error } = useQuery<IProduct[]>({ queryKey: ["products"], queryFn: getAllProducts });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setDeleteOpen(false);
            setSelectedProduct(null);
            alert("Your Selected Product Is Deleted!!")
        },
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
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Modify Products</h1>
                <Button onClick={() => navigate("/products/modify/add")}>Add Product</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ModifyCard
                        key={product.id}
                        product={product}
                        onEdit={() => navigate(`/products/modify/edit/${product.id}`)}
                        onDelete={() => { setSelectedProduct(product); setDeleteOpen(true); }}
                    />
                ))}
            </div>

            <AlertDialog open={isDeleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to delete {selectedProduct?.title}?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => selectedProduct && deleteMutation.mutate(selectedProduct.id)}>Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
