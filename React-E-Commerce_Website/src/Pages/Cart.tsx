
import { useCartStore } from "../Context/CartSrore";
import CartItem from "../components/CartItem";
import { Button } from "../components/ui/button";

export default function Cart() {
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="w-full flex flex-col items-center text-center p-6">

            <h2 className="text-4xl font-bold mb-10">Shopping Cart</h2>

            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <div className="w-full max-w-4xl space-y-4">
                    {cart.map((item) => (
                        <CartItem key={item.id} product={item} />
                    ))}


                    <div className="text-lg font-bold flex justify-between items-center border-t pt-4">
                        <h3 className="text-2xl">Order Summary</h3>
                        <p className="text-green-600 text-2xl">${total.toFixed(2)}</p>
                    </div>


                    <Button
                        variant="default"
                        className=" w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 rounded-lg cursor-pointer"
                        onClick={() => {
                            alert("Thank you for your purchase!");
                            clearCart();
                        }}
                    >
                        Checkout
                    </Button>
                </div>
            )}
        </div>
    );
}
