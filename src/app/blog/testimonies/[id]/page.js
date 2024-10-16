"use client";  // Add this line to mark the component as a Client Component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const TestimonyDetails = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [post, setPost] = useState(null);

    // Hardcoded posts data
    const posts = [
        { id: 1, name: 'John Doe', date: '2024-10-16', title: 'My First Blog Post', content: 'This is the full content of the first post.' },
        { id: 2, name: 'Jane Doe', date: '2024-10-15', title: 'Another Blog Post', content: 'This is the full content of another post.' }
    ];

    useEffect(() => {
        if (id) {
            const foundPost = posts.find(post => post.id === parseInt(id));
            setPost(foundPost);
        }
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-600 mb-4">By {post.name} on {post.date}</p>
            <p className="text-lg">{post.content}</p>
        </div>
    );
};

export default TestimonyDetails;
