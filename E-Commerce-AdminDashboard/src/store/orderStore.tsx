
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface OrderStatusStore {
    statuses: Record<number, string>;
    setStatus: (orderId: number, status: string) => void;
}

export const useOrderStore = create<OrderStatusStore>()(
    persist(
        (set) => ({
            statuses: {},
            setStatus: (orderId, status) =>
                set((state) => ({
                    statuses: { ...state.statuses, [orderId]: status },
                })),
        }),
        { name: "order-status-storage" }
    )
);

