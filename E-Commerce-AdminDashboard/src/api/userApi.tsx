import axios from "axios";

const API_URL = "https://dummyjson.com/users";


export const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data.users;
};


export const fetchUserById = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};


export const updateUser = async (id: number, updatedData: object) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
};
