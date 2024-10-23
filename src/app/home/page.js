import React from "react";
import EventCard from "../components/EventCard.jsx";
import YouTubeLatestVideo from "../components/YouTubeLatestVideo"; // Adjust the path as necessary
import ImageCarousel from '../components/ImageCarousel.jsx';
import DevotionalPost from "../components/DevotionalPost.jsx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageTransition from "../components/PageTransition.js";
const img = "/pics/Facebook.png";
const images = [
  '/pics/1.jpg',
  '/pics/2.jpg',
  '/pics/3.jpg',
  '/pics/4.jpg',
  '/pics/5.jpg',
];
export default function HomePage() {
  return (
    <>
      <PageTransition>
        {/* Main content of your homepage goes here */}
        <div className="p-4">
          <h1 className="text-center text-3xl font-bold mt-4">
            Welcome to My Website
          </h1>
          <ImageCarousel images={images} />

          <EventCard
            picURL={img}
            description={"HIKE"}
            time={"11 SEPT | SAT | 8AM"}
            location={"Rietvlei Zoo"}
          />
          <EventCard
            picURL={img}
            description={"SPORTS DAY"}
            time={"20 OCT | SAT | 8AM"}
            location={"ELOHIM CHURCH"}
          />
             <YouTubeLatestVideo />

             <div className="border border-gray-300 rounded-2xl p-4 shadow-md max-w-lg mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
      <h2 className="text-gray-800 text-2xl font-semibold">Latest Devotion</h2>
      <DevotionalPost
          verse="Isaiah 41:10 
“Fear not, for I am with you;
Be not dismayed, for I am your God. 
I will strengthen you,
I will uphold you with My righteous right hand”"
          message="Remember, with faith and determination, you can overcome any challenge.
Remember, with faith and determination, you can overcome any challenge.
Remember, with faith and determination, you can overcome any challenge.
Remember, with faith and determination, y."
          date="2024/10/11"
          username="ConnectYouth"
          profilePic="/icons/connect youth logo.svg"
        />
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
        </div>
      </PageTransition>
      {/* <a href="https://wa.me/27638074854?text=Hello%2C%20how%20are%20you%3F" target="_blank">Send WhatsApp Message to Matthew</a>
       <a href="" target="_blank">Youth Group</a>
       <a href="https://www.instagram.com/connect_emcc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">Open instagram profile</a> */}

      {/* Commented out just because it was in the way  */}
      {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSemUOkSVIMr6SWJCKqM8BNNpRdPLsq3SGGmgocVwuzKdwFP4A/viewform?embedded=true" width="640" height="1094" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
    </>
  );
}
