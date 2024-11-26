// src/app/components/EmblaCarouselArrowButtons.js
import React from 'react'

export const PrevButton = ({ onClick, disabled }) => (
  <button
    className="embla__prev"
    onClick={onClick}
    disabled={disabled}
  >
    Prev
  </button>
)

export const NextButton = ({ onClick, disabled }) => (
  <button
    className="embla__next"
    onClick={onClick}
    disabled={disabled}
  >
    Next
  </button>
)

export const usePrevNextButtons = (emblaApi) => {
  const prevBtnDisabled = emblaApi ? emblaApi.canScrollPrev() : false
  const nextBtnDisabled = emblaApi ? emblaApi.canScrollNext() : false

  const onPrevButtonClick = () => emblaApi && emblaApi.scrollPrev()
  const onNextButtonClick = () => emblaApi && emblaApi.scrollNext()

  return { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick }
}
