import axios from "axios";

import { IOrder, IUser } from "@/context/types";



export const fetchOrders = async (): Promise<IOrder[]> => {
    const { data } = await axios.get("https://dummyjson.com/carts");
    return data.carts;
};

export const fetchUserById = async (userId: number): Promise<IUser> => {
    const { data } = await axios.get(`https://dummyjson.com/users/${userId}`);
    return data;
};

export const fetchOrderById = async (orderId: number): Promise<IOrder> => {
    const response = await axios.get(`https://dummyjson.com/carts/${orderId}`);
    return response.data;
};

export const deleteOrder = async (orderId: number) => {
    const response = await axios.delete(`https://dummyjson.com/carts/${orderId}`);
    return response.data;
};

