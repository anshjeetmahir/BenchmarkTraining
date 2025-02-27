import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ModifyProductState } from "../Context/types";


export const useModifyProductStore = create<ModifyProductState>()(
    persist(
        (set) => ({
            products: [],
            setProducts: (products) => set({ products }),
            addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
            updateProduct: (updatedProduct) =>
                set((state) => ({
                    products: state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
                })),
            deleteProduct: (id) =>
                set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
            resetProducts: () => set({ products: [] }),
        }),
        { name: "modify-product-store" }
    )
);
