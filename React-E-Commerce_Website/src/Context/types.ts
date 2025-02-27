export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: IRating
}


export interface IRating {
    rate: number;
    count: number;
}

export interface ICartItem extends IProduct {
    quantity: number;
}

export interface IState {
    cart: ICartItem[];
}

export type Action =
    | { type: "ADD_TO_CART"; payload: ICartItem }
    | { type: "REMOVE_FROM_CART"; payload: number };

export interface IGlobalContext {
    state: IState;
    dispatch: React.Dispatch<Action>;
}

export interface IChildren {
    children: React.ReactNode;
}
