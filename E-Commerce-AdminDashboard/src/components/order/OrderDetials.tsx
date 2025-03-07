import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface DeleteOrderButtonProps {
    orderId: number;
    onSuccess: () => void;
}

const deleteOrder = async (orderId: number) => {
    await axios.delete(`https://dummyjson.com/orders/${orderId}`);
};

const DeleteOrderButton = ({ orderId, onSuccess }: DeleteOrderButtonProps) => {


    const mutation = useMutation({
        mutationFn: () => deleteOrder(orderId),
        onSuccess: () => {

            onSuccess();
        }
    });

    return (
        <Button
            variant="contained"
            color="error"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
        >
            {mutation.isPending ? "Deleting..." : "Delete Order"}
        </Button>
    );
};

export default DeleteOrderButton;
