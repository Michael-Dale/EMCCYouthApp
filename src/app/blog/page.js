"use client";
import { useEffect, useState } from "react";
import PageTransition from "../components/PageTransition";
import DevotionalPost from "../components/DevotionalPost";
import PdfThumbnail from "../components/PdfThumbnail";
import BlogPostSnippet from "../components/BlogPostSnippet";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  const [latestSermon, setLatestSermon] = useState(null);
  const [devotion, setDevotion] = useState(null);

  useEffect(() => {
    async function fetchLatestDevotion() {
      try {
        const response = await fetch("/api/devotions?latest=true");
        const data = await response.json();
        setDevotion(data);
      } catch (error) {
        console.error("Error fetching latest devotion:", error);
        setDevotion(false);
      }
    }

    async function fetchLatestSermon() {
      try {
        const response = await fetch("/api/sermons?latest=true");
        const sermonData = await response.json();
        setLatestSermon(sermonData);
      } catch (error) {
        console.error("Error fetching latest sermon:", error);
        setLatestSermon(false);
      }
    }

    fetchLatestDevotion();
    fetchLatestSermon();
  }, []);

  return (
    <PageTransition>
      <div className="border border-gray-300 rounded-2xl p-4 shadow-md max-w-md mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
        <h2 className="text-gray-800 text-2xl font-semibold text-center">
          Latest Devotion
        </h2>
        {devotion ? (
          <DevotionalPost
            verse={devotion.verse}
            message={devotion.message}
            date={devotion.devotion_datetime}
          />
        ) : null}
        <div className="text-center mt-4">
          <Link href="/blog/devotions" className="inline-flex items-center ...">
            <span>View all devotions</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="border border-gray-300 rounded-2xl p-4 shadow-md max-w-md mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
        <h2 className="text-gray-800 text-2xl font-semibold text-center">
          Latest Sermon
        </h2>
        {latestSermon ? (
          <PdfThumbnail
            pdfUrl={latestSermon.sermon_pdf_url}
            title={latestSermon.title}
            imgSrc={latestSermon.sermon_image_url}
          />
        ) : (
          <div>Loading latest sermon...</div>
        )}
        <div className="text-center mt-4">
          <Link href="/blog/sermons" className="inline-flex items-center ...">
            <span>View all sermons</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="border border-gray-300 rounded-2xl p-4 shadow-md max-w-md mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
        <h2 className="text-gray-800 text-2xl font-semibold text-center">
          Latest Testimony
        </h2>

        <BlogPostSnippet
          id={1}
          name={"John Doe"}
          date={"2024-10-16"}
          title={"My First Blog Post"}
          content={"This is the full content of the first post."}
        />
        <div className="text-center mt-4">
          <Link
            href="/blog/testimonies"
            className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white rounded-md transition-colors duration-300 ease-in-out"
          >
            <span>View all testimonies</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
