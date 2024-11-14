"use client"; 
import { useEffect, useState } from 'react';
import BlogPostSnippet from '../../components/BlogPostSnippet';

export default function Testimonies() {
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
    <div className="container mx-auto p-6">
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
  );
}
