
import axios from 'axios';
import { useState } from 'react';
import './GetPost.css';

interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

const GetPost = () => {
    const [post, setPost] = useState<IPost | null>(null);
    const [postComment, setPostComment] = useState<IComment[]>([]);
    const [postId, setPostId] = useState<string>('');
    const [postCommentId, setPostCommentId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [responseCode, setResponseCode] = useState<number>(0);

    const fetchSinglePost = async () => {
        if (!postId.trim()) {
            setPost(null);
            return;
        }
        setLoading(true);
        setError(null);
        axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(res => {
                if (res.status !== 200) throw new Error('Post not found!');
                setPost(res.data);
                setResponseCode(res.status);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    };

    const fetchUserPost = async () => {
        if (!postCommentId.trim()) {
            setPostComment([]);
            return;
        }
        setLoading(true);
        setError(null);
        axios.get<IComment[]>(`https://jsonplaceholder.typicode.com/posts/${postCommentId}/comments`)
            .then(res => {
                if (Number(postCommentId) > 100)
                    throw new Error('Comments not found!');
                setPostComment(res.data);
                setResponseCode(res.status);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <div className="container">
                <h2 className="title">GET POSTS & COMMENTS</h2>
                <div className="input-container">
                    <input type="number" placeholder="Enter Id.."
                        onChange={(e) => setPostId(e.target.value)}
                        value={postId} className="input-field" />
                    <button onClick={fetchSinglePost} className="button">GET POST</button>
                </div>
                <div className="input-container">
                    <input type="number" placeholder="Enter Post Id.."
                        onChange={(e) => setPostCommentId(e.target.value)}
                        value={postCommentId} className="input-field" />
                    <button onClick={fetchUserPost} className="button">GET COMMENT</button>
                </div>
            </div>

            <div>
                {loading && <p>Loading...</p>}
                {error && <div className="error-message">{error}</div>}

                {post && (
                    <div>
                        <h3>Posts</h3>
                        <div className="result-box">
                            <div><strong>User ID:</strong> {post.userId}</div>
                            <div><strong>ID:</strong> {post.id}</div>
                            <div><strong>Title:</strong> {post.title}</div>
                            <div><strong>Body:</strong> {post.body}</div>
                            <h3 style={{ backgroundColor: "white", marginTop: "10px", color: "green", padding: '5px' }}><strong>Response Code:</strong> {responseCode}</h3>

                        </div>
                    </div>
                )}

                {postComment.length > 0 && (
                    <div>
                        <h3>Comments</h3>
                        {postComment.map((comment) => (
                            <div key={comment.id} className="result-box">
                                <div><strong>Post ID:</strong> {comment.postId}</div>
                                <div><strong>Comment ID:</strong> {comment.id}</div>
                                <div><strong>Name:</strong> {comment.name}</div>
                                <div><strong>Email:</strong> {comment.email}</div>
                                <div><strong>Comment:</strong> {comment.body}</div>
                                <h3 style={{ backgroundColor: "white", marginTop: "10px", color: "green", padding: '5px' }}><strong>Response Code:</strong> {responseCode}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default GetPost;
