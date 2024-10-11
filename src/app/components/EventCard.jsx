"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

// Function to generate a random hex color
const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

export default function Component({ picURL, location, time, description }) {
  const [imageError, setImageError] = useState(false);
  const randomHoverColor = getRandomColor(); // Generate a random hover color

  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl mb-6">
      {/* Removed padding from CardHeader */}
      <CardHeader className="p-0">
        {/* Added rounding to the top of the image container */}
        <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
          {!imageError ? (
            <Image
              src={picURL}
              alt="Rietvlei trails"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <span>Image not available</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-xl font-extrabold">{description}</p>
        <p className="text-m font-medium text-muted-foreground">{location}</p>
        <p className="text-m font-semibold">{time}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className={`rounded-full text-lg px-8 py-6 font-bold`}
          style={{
            backgroundColor: 'white', // Default background color
            color: 'black',            // Default text color
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = randomHoverColor; // Set random hover color
            e.currentTarget.style.color = 'white'; // Change text color on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white'; // Reset to default
            e.currentTarget.style.color = 'black'; // Reset text color
          }}
        >
          + Calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
