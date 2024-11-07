"use client";  // Add this line to mark the component as a Client Component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const TestimonyDetails = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [post, setPost] = useState(null);

    // Hardcoded posts data
    const posts = [
        { id: 1, name: 'John Doe', date: '2024-10-16', title: 'My First Blog Post', content: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.` },
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
            <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
        </div>
    );
};

export default TestimonyDetails;
