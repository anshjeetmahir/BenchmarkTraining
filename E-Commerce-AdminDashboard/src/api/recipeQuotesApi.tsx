import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";


export const fetchQuotes = async () => {
    const response = await axios.get(`${API_BASE_URL}/quotes`);
    return response.data.quotes;
};


export const fetchRecipes = async () => {
    const response = await axios.get(`${API_BASE_URL}/recipes`);
    return response.data.recipes;
};
