"use client";
import { useState, useEffect } from "react";
import React from "react";
import EmblaCarousel from "../components/EmblaCarousel";
import "../embla.css";
import EventCard from "../components/EventCard.jsx";
import YouTubeLatestVideo from "../components/YouTubeLatestVideo";
import DevotionalPost from "../components/DevotionalPost.jsx";
import PdfThumbnail from "../components/PdfThumbnail";
import BlogPostSnippet from "../components/BlogPostSnippet.jsx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageTransition from "../components/PageTransition.js";
// const img = "/pics/Facebook.png";
// const images = [
//   "/pics/1.jpg",
//   "/pics/2.jpg",
//   "/pics/3.jpg",
//   "/pics/4.jpg",
//   "/pics/5.jpg",
//   "/pics/5.jpg",
// ];

const OPTIONS = { dragFree: true, loop: true };

export default function HomePage() {
  const [devotion, setDevotion] = useState(null);
  const [latestSermon, setLatestSermon] = useState(null);
  const [latestTestimony, setLatestTestimony] = useState(null);
  const [events, setEvents] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    async function fetchCarouselImages() {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        const imageUrls = data.map((item) => item.image_url);
        setCarouselImages(imageUrls);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
        setCarouselImages([]);
      }
    }

    async function fetchUpcomingEvents() {
      try {
        const response = await fetch("/api/events?upcoming=true");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching latest devotion:", error);
        setEvents(false);
      }
    }
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

    async function fetchLatestTestimony() {
      try {
        const response = await fetch("/api/testimonies?latest=true");
        const testimonyData = await response.json();
        setLatestTestimony(testimonyData);
      } catch (error) {
        console.error("Error fetching latest testimony:", error);
        setLatestTestimony(false);
      }
    }

    fetchCarouselImages();
    fetchUpcomingEvents();
    fetchLatestDevotion();
    fetchLatestSermon();
    fetchLatestTestimony();
  }, []);

  return (
    <>
      <PageTransition>
        <h1 className="text-center text-3xl font-bold mt-4 p-4">
          Welcome to My Website
        </h1>
        {/* <ImageCarousel images={images} options={options} /> */}
        {/* <EmblaCarousel slides={images} options={OPTIONS} /> */}
        {carouselImages.length > 0 ? (
          <EmblaCarousel slides={carouselImages} options={OPTIONS} />
        ) : (
          <p className="text-center">No images available for the carousel.</p>
        )}

        {/* <script>
          ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
          </script> */}
        <div className="p-4">
          {events &&
            events.map((event) => (
              <EventCard
                key={event.id}
                picURL={event.image_url}
                description={event.title}
                location={event.location}
                date={event.event_datetime}
              />
            ))}
          {/* {events && events.length > 0 && (
            <EventCard
              key={events[0].id}
              picURL={events[0].image_url}
              description={events[0].title}
              location={events[0].location}
              date={events[0].event_datetime}
            />
          )} */}

          <YouTubeLatestVideo />

          {/* Latest Devotion Section */}
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
            ) : (
              <DevotionalPost
                verse={`Isaiah 41:10 
“Fear not, for I am with you;
Be not dismayed, for I am your God. 
I will strengthen you,
I will uphold you with My righteous right hand”`}
                message="Remember, with faith and determination, you can overcome any challenge."
                date="2024/10/11"
              />
            )}
            <div className="text-center mt-4">
              <Link
                href="/blog/devotions"
                className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white rounded-md transition-colors duration-300 ease-in-out"
              >
                <span>View all devotions</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Latest Sermon Section */}
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
              <PdfThumbnail
                pdfUrl="/docs/Beginners Guide Coding.pdf"
                title="Sample PDF 1"
                imgSrc="/pics/img.jpg"
              />
            )}
            <div className="text-center mt-4">
              <Link
                href="/blog/sermons"
                className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white rounded-md transition-colors duration-300 ease-in-out"
              >
                <span>View all sermons</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Latest Testimony Section */}
          <div className="border border-gray-300 rounded-2xl p-4 shadow-md max-w-md mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
            <h2 className="text-gray-800 text-2xl font-semibold text-center">
              Latest Testimony
            </h2>

            {latestTestimony ? (
              <BlogPostSnippet
                id={latestTestimony.id}
                name={latestTestimony.author}
                date={latestTestimony.post_datetime}
                title={latestTestimony.title}
                content={latestTestimony.message}
              />
            ) : (
              <BlogPostSnippet
                id={1}
                name={"John Doe"}
                date={"16/10/24"}
                title={"Testimony not found"}
                content={"There is no latest testimony available."}
              />
            )}
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
        </div>
      </PageTransition>
    </>
  );
}
