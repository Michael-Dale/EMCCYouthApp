"use client";  // Ensure this component runs client-side

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TestimonyDetails = () => {
    const router = useRouter(); // Next.js Router for navigation
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
        <div className='p-4'> 
        <div className="p-4 bg-white rounded-md shadow-md mb-4">
            {/* Title, author, and date section with border */}
            <div className="border-b-2 border-gray-300 pb-4 mb-4">
                <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
                <p className="text-gray-600 mb-4">By {post.author} on {post.post_datetime}</p>
            </div>

            {/* Content section */}
            <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.message.replace(/\n/g, "<br />") }} />
        </div>
        <Button
        type="button"
        onClick={() => router.push("/blog/testimonies")}
        className="bg-black text-white rounded-full p-4 py-2 shadow-md hover:bg-gray-800 flex items-center justify-center"
      >
        Back To Testimonies
      </Button>
      </div>
    );
};

export default TestimonyDetails;
