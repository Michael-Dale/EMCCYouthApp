"use client"; 
import { useEffect, useState } from 'react';
import BlogPostSnippet from '../../components/BlogPostSnippet';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Testimonies() {
  const router = useRouter(); // Next.js Router for navigation
  const [testimonies, setTestimonies] = useState([]);

  useEffect(() => {
    async function fetchTestimonies() {
      try {
        const response = await fetch("/api/testimonies");
        const data = await response.json();
        setTestimonies(data);
      } catch (error) {
        console.error("Error fetching testimonies:", error);
      }
    }

    fetchTestimonies();
  }, []);

  return (
    <div className='p-4'>
       <Button
            type="button"
            onClick={() => router.push("/blog")}
            className="bg-black text-white rounded-full px-4 py-2 shadow-md hover:bg-gray-800 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Button>
    <div className="container mx-auto p-4">
      {testimonies.length > 0 ? (
        testimonies.map(post => (
          <div key={post.id} className="mb-4">
            <BlogPostSnippet
              id={post.id}
              name={post.author}
              date={post.post_datetime}
              title={post.title}
              content={post.message}
            />
          </div>
        ))
      ) : (
        <div>Loading testimonies...</div>
      )}
    </div>
    </div>
  );
}
