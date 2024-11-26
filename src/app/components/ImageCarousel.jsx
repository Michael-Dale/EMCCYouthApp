"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ 
  images,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imageHeight, setImageHeight] = useState('auto');
  const [isPaused, setIsPaused] = useState(false);

  // Handle image navigation
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [goToNext, autoPlayInterval, isPaused]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 75;
    if (touchStart - touchEnd > swipeThreshold) {
      goToNext();
    } else if (touchStart - touchEnd < -swipeThreshold) {
      goToPrevious();
    }
    setIsPaused(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Preload images
  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        if (loadedImages.size === 0) {
          const viewportHeight = window.innerHeight;
          const maxHeight = Math.min(viewportHeight * 0.8, img.naturalHeight);
          setImageHeight(`${maxHeight}px`);
        }
      };
    };

    if (!loadedImages.has(images[currentIndex])) {
      preloadImage(images[currentIndex]);
    }

    const nextIndex = (currentIndex + 1) % images.length;
    if (!loadedImages.has(images[nextIndex])) {
      preloadImage(images[nextIndex]);
    }
  }, [currentIndex, images, loadedImages]);

  const handleImageLoad = (e) => {
    const img = e.target;
    const viewportHeight = window.innerHeight;
    const maxHeight = Math.min(viewportHeight * 0.8, img.naturalHeight);
    setImageHeight(`${maxHeight}px`);
  };

  const isCurrentImageLoaded = loadedImages.has(images[currentIndex]);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-900 p-0">
      {/* Background blur container */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ 
          backgroundImage: `url(${images[currentIndex]})`,
          filter: 'blur(20px) brightness(0.5)',
          transform: 'scale(1.1)', // Prevent blur edges from showing
        }}
      />
      
      {/* Main container */}
      <div 
        className="relative w-full"
        style={{ height: imageHeight }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Loading spinner */}
        {!isCurrentImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Image container with transition */}
        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Set image translation based on currentIndex */}
          <div className="absolute flex w-full h-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // Slides images horizontally
            }}
          >
            {images.map((src, index) => (
              <div className="w-full flex-shrink-0" key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain transition-all duration-1000 ease-in-out"
                  onLoad={handleImageLoad}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {showArrows && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white hidden md:block"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white hidden md:block"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {showDots && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${ 
                  currentIndex === index 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
