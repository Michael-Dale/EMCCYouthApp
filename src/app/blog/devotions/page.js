"use client";
import { useState, useEffect } from "react";
import PageTransition from "../../components/PageTransition";
import DevotionalPost from "../../components/DevotionalPost";

export default function Blog() {
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
