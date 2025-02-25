import React, { createContext, useReducer, ReactNode } from "react";
import { globalReducer } from "./GlobalReducer";
import { IState, IAction } from "./types";

const initialState: IState = {
    products: [],
    categories: [],
    cart: [],
    adminToken: "",
    isAuthenticated: false,
};

export const GlobalContext = createContext<{ state: IState; dispatch: React.Dispatch<IAction> } | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

