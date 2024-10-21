"use client";
import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Automatically switch to the next image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [images.length]);

  // Handle swipe start (touchstart)
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle swipe move (touchmove)
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle swipe end (touchend)
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left (next image)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right (previous image)
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div
      className="relative w-[90vw] h-[50vh] mx-auto flex justify-center items-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-full object-contain"
      />

      {/* Dots indicator */}
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'} cursor-pointer`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;




