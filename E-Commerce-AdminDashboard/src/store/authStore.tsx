
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "@/context/types";



export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            username: null,
            isAuthenticated: false,
            setAuth: (token, username) =>
                set({ token, username, isAuthenticated: true }),
            logout: () => set({ token: null, username: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);
