import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState } from "../Context/types";



export const useCartStore = create<CartState>()(
    persist<CartState>(
        (set, get) => ({
            cart: [],
            addToCart: (product) => {
                if (!product || typeof product.id === "undefined") {
                    console.error("Invalid product added to cart:", product);
                    return;
                }
                const existingProduct = get().cart.find((item) => item.id === product.id);
                if (existingProduct) {
                    alert("This Item Is Already In The Cart!!")
                    set({
                        cart: get().cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    });
                } else {
                    set({ cart: [...get().cart, { ...product, quantity: 1 }] });
                    alert("Item is Added to Cart!!")
                }
            },
            removeFromCart: (id) => set({ cart: get().cart.filter((item) => item.id !== id) }),
            increaseQuantity: (id) =>
                set({
                    cart: get().cart.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                }),
            decreaseQuantity: (id) =>
                set({
                    cart: get().cart.map((item) =>
                        item.id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                }),

            clearCart: () => set({ cart: [] }),
        }),
        { name: "cart-storage" }
    )
);
