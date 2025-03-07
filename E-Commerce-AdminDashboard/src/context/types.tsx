import { PaletteMode } from "@mui/material";

export interface IOrderProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    thumbnail: string;
}

export interface IOrder {
    id: number;
    userId: number;
    products: IOrderProduct[];
    total: number;
    discountedTotal: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface IOrderProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    thumbnail: string;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
        city: string;
        street: string;
    };
}


export interface ICart {
    id: number;
    totalProducts: number;
    totalQuantity: number;
    discountedTotal: number;
}


export interface IPost {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface PostCardProps {
    post: IPost;
}


export interface IProduct {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
}

export interface ProductCardProps {
    product: IProduct;
}


export interface ICategory {
    name: string;
}

export interface IRating extends IProduct {
    rating: string,
    description: string,
    brand: string,
    stock: number
}

export interface QuoteCardProps {
    text: string;
    author: string;
}

export interface RecipeCardProps {
    title: string;
    ingredients: string[];
}

export interface ThemeContextType {
    toggleColorMode: () => void;
    mode: PaletteMode;
}

export interface AuthState {
    token: string | null;
    username: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string, username: string) => void;
    logout: () => void;
}

export interface ICart {
    id: number;
    userId: number;
    total: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface CartState {
    carts: ICart[];
    totalCarts: number;
    fetchCarts: (limit?: number, skip?: number) => Promise<void>;
}

export interface Comment {
    id: number;
    postId: number;
    body: string;
    userId: number;
}

export interface CommentStore {
    comments: Comment[];
    addComment: (comment: Comment) => void;
    setComments: (comments: Comment[]) => void;
}

export interface ThemeState {
    darkMode: boolean;
    toggleTheme: () => void;
}

export interface LoginFormInputs {
    username: string;
    password: string;
}

export interface IComment {
    id: number;
    body: string;
    postId: number;
    userId: number;
}


export interface IPostBlog {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: { likes: number; dislikes: number };
    views: number;
    userId: number;
}

export interface IProductDetail {
    id: number;
    title: string;
    brand: string;
    description: string;
    price: number;
    discountPercentage: number;
    stock: number;
    category: string;
    rating: number;
    thumbnail: string;
    images: string[];
    sku: string;
    meta: { barcode: string; qrCode: string };
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
    dimensions: { width: number; height: number; depth: number };
    tags: string[];
    reviews: IReview[];
}

export interface IReview {
    reviewerName: string;
    rating: number;
    date: string;
    comment: string;
}


export interface IProductDetailCart {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

export interface ICartDetail {
    id: number;
    userId: number;
    products: IProductDetailCart[];
    total: number;
    discountedTotal: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface IUserDetail {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string
}

export interface IAddCartPayload {
    userId: number;
    products: { id: number; quantity: number }[];
}

export interface IQuote {
    id: number;
    quote: string;
    author: string;
}

export interface IRecipe {
    id: number;
    name: string;
    ingredients: string[];
}


export enum SortOptions {
    PRICE_ASC = "PRICE_ASC",
    PRICE_DESC = "PRICE_DESC",
    TITLE_ASC = "TITLE_ASC",
    TITLE_DESC = "TITLE_DESC",
}

export interface IUserDetail {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    address: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    university: string;
    company: {
        name: string;
        department: string;
        title: string;
    };
    bank: {
        cardNumber: string;
        cardType: string;
        cardExpire: string;
    };
}

export interface AddCommentProps {
    postId: number;
}

export interface BlogListProps {
    paginatedPosts?: IPost[];
}

export interface CommentSectionProps {
    comments: IComment[];
}

export interface PostDetailsProps {
    post: IPostBlog;
}

export interface AddCartDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    addCartMutation: any;
    userId?: number;
}
export interface CartActionsProps {
    setOpenDialog: (open: boolean) => void;
    deleteCartMutation: { mutate: () => void; isPending: boolean };
    userId?: number;
}

export interface CartItemProps {
    cart: ICart;
}

export interface CartListProps {
    carts: ICart[];
    isLoading: boolean;
    page: number;
    itemsPerPage: number;
    setPage: (value: number) => void;
}

export interface CartPaginationProps {
    totalPages: number;
    page: number;
    setPage: (value: number) => void;
}

export interface CartProductsProps {
    cart: ICartDetail;
}