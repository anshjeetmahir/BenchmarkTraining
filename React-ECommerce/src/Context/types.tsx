export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;

}

export interface IState {
    products: IProduct[];
    categories: string[];
    cart: IProduct[];
    isAuthenticated: boolean;
    adminToken: string;
}

export type IAction =
    | { type: "SET_PRODUCTS"; payload: IProduct[] }
    | { type: "SET_CATEGORIES"; payload: string[] }
    | { type: "ADD_TO_CART"; payload: IProduct }
    | { type: "REMOVE_FROM_CART"; payload: number }
    | { type: "INCREASE_QUANTITY"; payload: number }
    | { type: "DECREASE_QUANTITY"; payload: number }
    | { type: "CLEAR_CART"; }
    | { type: "LOGIN_ADMIN"; payload: string }
    | { type: "LOGOUT_ADMIN"; payload: string };
