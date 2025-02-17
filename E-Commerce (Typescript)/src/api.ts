import axios from "axios";




const fakeStoreAPI = axios.create({
    baseURL: "https://fakestoreapi.com",
});


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



const del = async (url: string) => {
    const response = await fakeStoreAPI.delete(url);
    return response.data;
};


export { get, post, put, del };
