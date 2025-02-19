import React, { useState } from 'react';
import axios from 'axios';
import './SendPost.css';


interface ISendPost {
    userId: string;
    title: string;
    body: string;
}

const SendPost = () => {
    const [formData, setFormData] = useState<ISendPost>({
        userId: '',
        title: '',
        body: ''
    });
    const [response, setResponse] = useState<ISendPost | null>(null);
    const [responseCode, setResponseCode] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResponse(null);

        axios.post('https://jsonplaceholder.typicode.com/posts', formData)
            .then(res => {
                if (res.status !== 201) throw new Error('Sorry! Unable to Send Post');
                setResponseCode(res.status)
                setResponse(res.data);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    };

    return (
        <>

            <div className="form-container">
                <h2>Create Post</h2>
                <form onSubmit={handleSubmit}>

                    <input type="number" name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} required />

                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

                    <textarea name="body" placeholder="Body" value={formData.body} onChange={handleChange} required />

                    <button type="submit" className="submit-button">Send</button>

                </form>

                {loading && <p>Sending data...</p>}
                {error && <p className="error-message">{error}</p>}
                {response && (
                    <div className="response-box">
                        <h3 style={{ color: 'green' }}>Response Code: {responseCode}</h3>
                        <h3>Response:</h3>
                        <p>{JSON.stringify(response, null, 2)}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default SendPost;
