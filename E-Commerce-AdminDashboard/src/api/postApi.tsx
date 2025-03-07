import axios from "axios";

const BASE_URL = "https://dummyjson.com";


export const fetchPosts = async () => {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data.posts;
};


export const fetchPostById = async (postId: number) => {
    const response = await axios.get(`${BASE_URL}/posts/${postId}`);
    return response.data;
};

export const fetchComments = async () => {
    const response = await axios.get(`${BASE_URL}/comments`);
    return response.data.comments;
};


export const addComment = async (postId: number, commentText: string) => {
    const response = await axios.post(`${BASE_URL}/comments/add`, {
        postId,
        body: commentText,
        userId: 1,
    });
    return response.data;
};
