
import { IProduct } from "../Context/types";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

interface ModifyCardProps {
    product: IProduct;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ModifyCard({ product, onEdit, onDelete }: ModifyCardProps) {
    return (
        <Card className="p-4">
            <CardContent>
                <img src={product.image} alt={product.title} className="h-40 mx-auto" />
                <h2 className="text-lg text-center font-bold">{product.title}</h2>
                <p className="text-green-600 text-center">${product.price}</p>
                <div className="flex justify-between mt-4">
                    <Button variant="default" onClick={onEdit}>Edit</Button>
                    <Button variant="destructive" onClick={onDelete}>Delete</Button>
                </div>
            </CardContent>
        </Card>
    );
}
