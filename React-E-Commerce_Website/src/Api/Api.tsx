import axios from "axios";
import { IProduct } from "../Context/types";

const API_URL = "https://fakestoreapi.com/products";


export const getAllProducts = async (): Promise<IProduct[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};


export const getProductById = async (id: number): Promise<IProduct> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const getProductsByCategory = async (category: string) => {
    const response = await axios.get(`${API_URL}/category/${category}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
};

export const getFilteredProducts = async (category?: string, limit?: number, sort?: string) => {
    let url = API_URL;

    if (category && category !== "All") {
        url = `${API_URL}/category/${category}`;
    }

    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (sort) params.append("sort", sort);

    try {
        const response = await axios.get(`${url}?${params.toString()}`);

        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};


export const addProduct = async (product: IProduct): Promise<IProduct> => {
    const { data } = await axios.post(API_URL, product);
    return data;
};


export const editProduct = async (product: IProduct): Promise<IProduct> => {
    const { data } = await axios.put(`${API_URL}/${product.id}`, product);
    return data;
};


export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};