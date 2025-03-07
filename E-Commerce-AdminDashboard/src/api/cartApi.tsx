

import axios from "axios";


const API_URL = "https://dummyjson.com/carts";


export const fetchCarts = async () => {
    const response = await axios.get(API_URL);
    return response.data.carts;
};


export const fetchCartById = async (cartId: number) => {
    const response = await axios.get(`${API_URL}/${cartId}`);
    return response.data;
};


export const addCart = async (cartData: { userId: number; products: { id: number; quantity: number }[] }) => {
    const response = await axios.post(`${API_URL}/add`, cartData);
    return response.data;
};

export const deleteCart = async (cartId: number) => {
    await axios.delete(`${API_URL}/${cartId}`);
};

