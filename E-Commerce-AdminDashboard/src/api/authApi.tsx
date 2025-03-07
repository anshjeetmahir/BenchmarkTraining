import axios from "axios";


interface LoginResponse {
    accessToken: string;
    username: string;
}


const API_URL = "https://dummyjson.com/auth/login";

export const login = async (username: string, password: string): Promise<LoginResponse> => {

    const response = await axios.post(API_URL, { username, password });

    return {
        accessToken: response.data.accessToken,
        username: response.data.username,
    };
};
