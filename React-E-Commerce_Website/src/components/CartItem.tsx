
import { ICartItem } from "../Context/types";
import { useCartStore } from "../Context/CartSrore";

interface CartItemProps {
    product: ICartItem;
}

export default function CartItem({ product }: CartItemProps) {

    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

    return (
        <div className="grid grid-cols-[2fr_11fr_2fr_1.5fr_0.5fr_0.5fr_2fr] items-center border-b py-4 w-full text-center">

            <div className="flex justify-center">
                <img src={product.image} alt={product.title} className="w-20 h-20 object-contain" />
            </div>


            <div className="text-left ml-5">
                <h3 className="text-lg font-semibold">{product.title}</h3>
            </div>


            <div className="flex flex-col items-center">
                <p>Price:</p>
                <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
            </div>


            <div className="text-center  ml-5 ">
                <p>Qty: {product.quantity}</p>
            </div>


            <button
                onClick={() => increaseQuantity(product.id)}
                className="px-3 py-1 bg-black text-white font-bold rounded hover:bg-gray-700  ml-5 cursor-pointer"
            >
                +
            </button>
            <button
                onClick={() => decreaseQuantity(product.id)}
                className="px-3 py-1 bg-black text-white font-bold rounded hover:bg-gray-700  ml-5 cursor-pointer"
                disabled={product.quantity <= 1}
            >
                -
            </button>


            <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700  ml-5 cursor-pointer"
            >
                Remove
            </button>
        </div>
    );
}
