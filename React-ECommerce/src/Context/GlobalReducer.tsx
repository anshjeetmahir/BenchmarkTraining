import { IState, IAction } from "./types";

export const globalReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {

        case "ADD_TO_CART":
            const existingItem = state.cart.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                    ),
                };
            }
            return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };

        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

        case "INCREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                ),
            };

        case "DECREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };

        case "CLEAR_CART":
            return { ...state, cart: [] };

        case "LOGIN_ADMIN":
            return { ...state, adminToken: action.payload, isAuthenticated: true };

        case "LOGOUT_ADMIN":
            return { ...state, adminToken: "", isAuthenticated: false };

        default:
            return state;
    }
};
