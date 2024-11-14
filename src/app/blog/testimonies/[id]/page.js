"use client";  // Ensure this component runs client-side

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const TestimonyDetails = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Fetch the testimony by ID from the dynamic API route
        if (id) {
            fetch(`/api/testimonies/${id}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Testimony not found');
                })
                .then(data => setPost(data))
                .catch(error => console.error(error));
        }
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            {/* Title, author, and date section with border */}
            <div className="border-b-2 border-gray-300 pb-4 mb-4">
                <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
                <p className="text-gray-600 mb-4">By {post.author} on {post.post_datetime}</p>
            </div>

            {/* Content section */}
            <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.message.replace(/\n/g, "<br />") }} />
        </div>
    );
};

export default TestimonyDetails;
