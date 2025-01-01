import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditCode = () => {
    const router = useRouter();
    const { id } = router.query;
    const [snippet, setSnippet] = useState({ title: '', code: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // Fetch the snippet data based on the ID
            const fetchSnippet = async () => {
                const response = await fetch(`/api/snippets/${id}`);
                const data = await response.json();
                setSnippet(data);
                setLoading(false);
            };
            fetchSnippet();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSnippet({ ...snippet, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update the snippet
        await fetch(`/api/snippets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(snippet),
        });
        router.push(`/snippets/${id}`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={snippet.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="code">Code</label>
                <textarea
                    id="code"
                    name="code"
                    value={snippet.code}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditCode;