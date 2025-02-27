import { createContext, useContext, useReducer } from "react";
import { IState, Action, IGlobalContext, IChildren } from "./types";

const initialState: IState = { cart: [] };


const reducer = (state: IState, action: Action): IState => {
    switch (action.type) {
        case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, action.payload] };
        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
        default:
            return state;
    }
};

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider = ({ children }: IChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};


export const useGlobalContext = (): IGlobalContext => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
