"use client";
import { useState, useEffect } from "react";
import PdfThumbnail from "../../components/PdfThumbnail";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SermonsPage() {
  const router = useRouter(); // Next.js Router for navigation
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSermons() {
      try {
        const response = await fetch("/api/sermons");
        if (!response.ok) throw new Error("Failed to fetch sermons");
        const data = await response.json();
        setSermons(data);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSermons();
  }, []);

  if (isLoading) {
    return <div>Loading sermons...</div>;
  }

  return (
    <div className="p-4">
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
    <div className="flex flex-col items-center p-4 space-y-4">
      {sermons.map((sermon) => (
        <div
          key={sermon.id}
          className="border border-gray-300 rounded-lg p-4 shadow-md w-full max-w-md bg-white"
        >
          <PdfThumbnail
            pdfUrl={sermon.sermon_pdf_url}
            title={sermon.title}
            imgSrc={sermon.sermon_image_url}
          />
        </div>
      ))}
    </div>
    </div>
  );
}
