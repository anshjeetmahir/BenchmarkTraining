
import { create } from "zustand";
import { fetchCarts } from "../api/cartApi";
import { CartState } from "@/context/types";



export const useCartStore = create<CartState>((set) => ({
    carts: [],
    totalCarts: 0,

    fetchCarts: async () => {
        const data = await fetchCarts();
        set({ carts: data.carts, totalCarts: data.total });
    },
}));
