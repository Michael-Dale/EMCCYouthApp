import React from "react";
import Navbar from "../components/Navbar.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import PageTransition from "../components/PageTransition.js";

export default function HomePage() {
  return (
    <>
      <PageTransition>
        <div>
          {/* Main content of your homepage goes here */}
          <h1 className="text-center text-3xl font-bold mt-4">
            Welcome to My Website
          </h1>
        </div>
      </PageTransition>
      {/* <a href="https://wa.me/27638074854?text=Hello%2C%20how%20are%20you%3F" target="_blank">Send WhatsApp Message to Matthew</a>
       <a href="" target="_blank">Youth Group</a>
       <a href="https://www.instagram.com/connect_emcc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">Open instagram profile</a> */}
      <SocialLinks />

      {/* Commented out just because it was in the way  */}
      {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSemUOkSVIMr6SWJCKqM8BNNpRdPLsq3SGGmgocVwuzKdwFP4A/viewform?embedded=true" width="640" height="1094" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
    </>
  );
}
