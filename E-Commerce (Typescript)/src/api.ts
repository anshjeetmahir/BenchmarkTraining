import axios from "axios";



// Create an Axios instance with a base URL
const fakeStoreAPI = axios.create({
    baseURL: "https://fakestoreapi.com",
});

// Export axios methods without explicit `Promise<>`
const get = async (url: string) => {
    const response = await fakeStoreAPI.get(url);
    return response.data;
};

const post = async (url: string, data?: any) => {
    const response = await fakeStoreAPI.post(url, data);
    return response.data;
};

const put = async (url: string, data?: any) => {
    const response = await fakeStoreAPI.put(url, data);
    return response.data;
};

const patch = async (url: string, data?: any) => {
    const response = await fakeStoreAPI.patch(url, data);
    return response.data;
};

const del = async (url: string) => {
    const response = await fakeStoreAPI.delete(url);
    return response.data;
};

// Export functions so they can be used anywhere
export { get, post, put, patch, del };
