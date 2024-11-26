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
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false); // Track if all images are loaded

  // Handle image navigation
  const goToNext = useCallback(() => {
    setBackgroundOpacity(0); // Reset background opacity for the fade-in effect
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setBackgroundOpacity(0); // Reset background opacity for the fade-in effect
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && imagesLoaded) {
      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [goToNext, autoPlayInterval, isPaused, imagesLoaded]);

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
    const preloadImages = () => {
      let loadedCount = 0;
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount += 1;
          setLoadedImages((prev) => new Set([...prev, src]));

          // Once all images are loaded, update the state
          if (loadedCount === images.length) {
            setImagesLoaded(true);
          }
        };
      });
    };

    preloadImages();
  }, [images]);

  const handleImageLoad = (e) => {
    const img = e.target;
    const viewportHeight = window.innerHeight;
    const maxHeight = Math.min(viewportHeight * 0.8, img.naturalHeight);
    setImageHeight(`${maxHeight}px`);
  };

  const isCurrentImageLoaded = loadedImages.has(images[currentIndex]);

  useEffect(() => {
    if (backgroundOpacity === 0) {
      const fadeTimer = setTimeout(() => setBackgroundOpacity(1), 100); // Delay fade-in for smoothness
      return () => clearTimeout(fadeTimer);
    }
  }, [currentIndex, backgroundOpacity]);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-900 p-0">
      {/* Background blur container with fade-in transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1500 ease-in-out"
        style={{ 
          backgroundImage: `url(${images[currentIndex]})`,
          filter: 'blur(20px) brightness(0.5)',
          transform: 'scale(1.1)', // Prevent blur edges from showing
          opacity: backgroundOpacity,
        }}
      />
      
      {/* Main container */}
      <div 
        className="relative w-full"
        style={{ height: imageHeight }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Loading spinner visible while images are loading */}
        <div className={`absolute inset-0 flex items-center justify-center bg-transparent ${imagesLoaded ? 'hidden' : ''}`}>
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>

        {/* Image container with transition */}
        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Set image translation based on currentIndex */}
          {imagesLoaded && (
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
          )}
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

// import React, { useCallback, useEffect, useRef, useState } from 'react'
// import useEmblaCarousel from 'embla-carousel-react'
// import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
// import { DotButton, useDotButton } from '../components/EmblaCarouselDotButton'

// const TWEEN_FACTOR_BASE = 0.2;

// const ImageCarousel = ({ images, options }) => {
//   const [emblaRef, emblaApi] = useEmblaCarousel(options);
//   const tweenFactor = useRef(0);
//   const tweenNodes = useRef([]);

//   const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick
//   } = usePrevNextButtons(emblaApi);

//   const setTweenNodes = useCallback((emblaApi) => {
//     tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
//       return slideNode.querySelector('.embla__parallax__layer');
//     });
//   }, []);

//   const setTweenFactor = useCallback((emblaApi) => {
//     tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
//   }, []);

//   const tweenParallax = useCallback((emblaApi, eventName) => {
//     const engine = emblaApi.internalEngine();
//     const scrollProgress = emblaApi.scrollProgress();
//     const slidesInView = emblaApi.slidesInView();
//     const isScrollEvent = eventName === 'scroll';

//     emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
//       let diffToTarget = scrollSnap - scrollProgress;
//       const slidesInSnap = engine.slideRegistry[snapIndex];

//       slidesInSnap.forEach((slideIndex) => {
//         if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

//         const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
//         const tweenNode = tweenNodes.current[slideIndex];
//         tweenNode.style.transform = `translateX(${translate}%)`;
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (!emblaApi) return;

//     setTweenNodes(emblaApi);
//     setTweenFactor(emblaApi);
//     tweenParallax(emblaApi);

//     emblaApi
//       .on('reInit', setTweenNodes)
//       .on('reInit', setTweenFactor)
//       .on('reInit', tweenParallax)
//       .on('scroll', tweenParallax)
//       .on('slideFocus', tweenParallax);
//   }, [emblaApi, tweenParallax]);

//   return (
//     <div className="embla" style={{ maxWidth: '100%', overflow: 'hidden' }}>
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container" style={{ display: 'flex', justifyContent: 'center' }}>
//           {images.map((image, index) => (
//             <div
//               className="embla__slide"
//               key={index}
//               style={{
//                 position: 'relative',
//                 display: 'flex',        // Align slides in a row
//                 justifyContent: 'center', // Center each image horizontally
//                 width: '100%',           // Make each slide take up full space
//                 flexShrink: 0,           // Prevent shrinking of slides
//               }}
//             >
//               <div className="embla__parallax">
//                 <div className="embla__parallax__layer">
//                   <img
//                     className="embla__slide__img embla__parallax__img"
//                     src={image}
//                     alt={`Slide ${index}`}
//                     style={{
//                       width: '100%',   // Make images take full width of the slide
//                       height: '300px', // Fixed height for all images
//                       objectFit: 'cover', // Ensure the image fills the container without stretching
//                       transition: 'transform 0.5s ease-out', // Smooth transition for parallax effect
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="embla__controls">
//         <div className="embla__buttons">
//           <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
//           <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
//         </div>

//         <div className="embla__dots">
//           {scrollSnaps.map((_, index) => (
//             <DotButton
//               key={index}
//               onClick={() => onDotButtonClick(index)}
//               className={'embla__dot'.concat(
//                 index === selectedIndex ? ' embla__dot--selected' : ''
//               )}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageCarousel;


