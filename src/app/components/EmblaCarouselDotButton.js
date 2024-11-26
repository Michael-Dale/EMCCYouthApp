// src/app/components/EmblaCarouselDotButton.js
import React from 'react'

export const DotButton = ({ onClick, className }) => (
  <button
    className={`embla__dot ${className}`}
    onClick={onClick}
  >
    ●
  </button>
)

export const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const scrollSnaps = emblaApi ? emblaApi.scrollSnapList() : []

  const onDotButtonClick = (index) => {
    emblaApi && emblaApi.scrollTo(index)
  }

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)

    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  return { selectedIndex, scrollSnaps, onDotButtonClick }
}
