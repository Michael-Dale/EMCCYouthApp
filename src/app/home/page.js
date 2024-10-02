import React from 'react';
import Navbar from "../components/Navbar.jsx";

export default function HomePage() {
    return (
        <>
        <div>
        {/* Main content of your homepage goes here */}
        <h1 className="text-center text-3xl font-bold mt-4">Welcome to My Website</h1>
      </div>
       <Navbar />
       <a href="https://wa.me/27638074854?text=Hello%2C%20how%20are%20you%3F" target="_blank">Send WhatsApp Message to Matthew</a>
       <a href="https://www.instagram.com/connect_emcc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">Open instagram profile</a>
        </>
      
    );
  }