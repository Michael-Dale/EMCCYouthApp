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
        </>
      
    );
  }