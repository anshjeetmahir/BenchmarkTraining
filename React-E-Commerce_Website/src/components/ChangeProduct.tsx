
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, editProduct, getProductById } from "../Api/Api";
import { IProduct } from "../Context/types";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function ChangeProduct() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const queryClient = useQueryClient();
    const isAdd = location.pathname.includes("/products/modify/add");
    const isEdit = location.pathname.includes("/products/modify/edit");


    const { data: product } = useQuery<IProduct>({
        queryKey: ["product", id],
        queryFn: () => getProductById(Number(id)),
        enabled: !!id && isEdit,
    });

    const [formData, setFormData] = useState<IProduct>({
        id: 0,
        title: "",
        price: 0,
        category: "",
        image: "",
        description: "",
        rating: { rate: 0, count: 0 },
    });


    if (isEdit && product && formData.id !== product.id) {
        setFormData(product);
    }

    const [open, setOpen] = useState(isAdd || isEdit);

    const addMutation = useMutation({
        mutationFn: (product: IProduct) => addProduct(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/products/modify");
            alert("Your New Product Has Been Added!!")
        },
    });

    const editMutation = useMutation({
        mutationFn: (product: IProduct) => editProduct(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/products/modify");
            alert("Your Selected Product Has Been Edited!!")
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "number" ? parseFloat(value) || 0 : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isAdd) addMutation.mutate(formData);
        if (isEdit) editMutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) navigate("/products/modify"); }}>
            <DialogContent>
                <h2 className="text-xl font-bold">{isAdd ? "Add Product" : "Edit Product"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>Price</Label>
                        <Input name="price" type="number" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>Category</Label>
                        <Input name="category" value={formData.category} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>Image URL</Label>
                        <Input name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <Button type="submit" className="cursor-pointer">{isAdd ? "Add Product" : "Update Product"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
