"use client";
import { useState, useEffect } from "react";
import PageTransition from "../../components/PageTransition";
import DevotionalPost from "../../components/DevotionalPost";
import DevotionSkeleton from "@/app/components/skeletons/DevotionSkeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Blog() {
  const router = useRouter(); // Next.js Router for navigation
  const [devotions, setDevotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDevotions() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/devotions");
        if (!response.ok) {
          throw new Error("Failed to fetch devotions");
        }
        const data = await response.json();
        setDevotions(data);
      } catch (error) {
        console.error("Error fetching devotions:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDevotions();
  }, []);

  if (isLoading) {
    return (
      // <div className="flex justify-center items-center min-h-screen">
      //   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-400"></div>
      // </div>
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {[1, 2, 3].map((index) => (
          <DevotionSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return null;
    // <div className="text-center p-4 text-red-600">
    //   <p>Error loading devotions: {error}</p>
    // </div>
  }

  if (!devotions.length) {
    return null;
  }

  return (
    <PageTransition>
      <div className="p-4">
        <div className="mb-6 flex justify-start">
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
        </div>
        {devotions.map((devotion) => (
          <DevotionalPost
            key={devotion.id}
            verse={devotion.verse}
            message={devotion.message}
            date={devotion.devotion_datetime}
          />
        ))}
      </div>
    </PageTransition>
  );
}
