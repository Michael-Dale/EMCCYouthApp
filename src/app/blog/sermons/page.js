"use client";
import { useState, useEffect } from "react";
import PdfThumbnail from "../../components/PdfThumbnail";

export default function SermonsPage() {
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
  );
}
