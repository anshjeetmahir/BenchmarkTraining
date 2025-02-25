import axios from "axios";
import { IProduct } from "../Context/types";

export const API_URL = "https://fakestoreapi.com";
export const PRODUCT_URL = "https://fakestoreapi.com/products";
const CATEGORY_URL = "https://fakestoreapi.com/products/categories";


export const fetchProducts = async () => {
    const response = await axios.get(PRODUCT_URL);
    return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
    const response = await axios.get(CATEGORY_URL);
    return response.data;
};

export const fetchProduct = async (id: string): Promise<IProduct> => {
    const response = await axios.get(`${PRODUCT_URL}/${id}`);
    return response.data;
};

