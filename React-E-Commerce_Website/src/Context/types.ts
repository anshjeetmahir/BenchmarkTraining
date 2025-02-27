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


export interface ModifyProductState {
    products: IProduct[];
    setProducts: (products: IProduct[]) => void;
    addProduct: (product: IProduct) => void;
    updateProduct: (product: IProduct) => void;
    deleteProduct: (id: number) => void;
    resetProducts: () => void;
}


export interface CartState {
    cart: ICartItem[];
    addToCart: (product: ICartItem) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
}

export interface ProductCardProps {
    product: IProduct;
}

export interface ModifyCardProps {
    product: IProduct;
    onEdit: () => void;
    onDelete: () => void;
}