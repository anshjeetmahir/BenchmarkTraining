import axios from "axios";
import { IRating } from "@/context/types";

const BASE_URL = "https://dummyjson.com/products";


export const fetchProducts = async () => {
    const response = await axios.get(`${BASE_URL}`);

    return response.data.products;
};

export const fetchProductById = async (id: number) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};


export const addProduct = async (productData: any): Promise<IRating> => {
    const response = await axios.post(`${BASE_URL}/add`, productData);
    return response.data;
};


export const updateProduct = async (id: number, updatedData: any) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return response.data;
};


export const deleteProduct = async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
};



export const fetchCategories = async () => {
    const response = await axios.get("https://dummyjson.com/products/categories");
    return response.data;
};

export const fetchProductsByCategory = async (category: string) => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return response.data.products;
};