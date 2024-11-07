"use client";

import { useState } from "react";

export const Slider = ({ value, min, max, step, onValueChange, ariaLabel }) => {
  const [sliderValue, setSliderValue] = useState(value[0]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSliderValue(newValue);
    onValueChange([newValue]);
  };

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        className="w-full h-2 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={ariaLabel}
      />
    </div>
  );
};
