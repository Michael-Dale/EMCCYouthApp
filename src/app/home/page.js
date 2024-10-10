import React from "react";
import Navbar from "../components/Navbar.jsx";
import EventCard from "../components/EventCard.jsx";

import PageTransition from "../components/PageTransition.js";
const img = "/pics/img.jpg";
export default function HomePage() {
  return (
    <>
      <PageTransition>
        {/* Main content of your homepage goes here */}
        <div className="p-4">
          <h1 className="text-center text-3xl font-bold mt-4">
            Welcome to My Website
          </h1>
          <EventCard picURL={img} />
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
