"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Function to generate a random pastel color
const getRandomPastelColor = () => {
  const r = Math.floor(Math.random() * 127 + 128); // 128 - 255 for pastel
  const g = Math.floor(Math.random() * 127 + 128); // 128 - 255 for pastel
  const b = Math.floor(Math.random() * 127 + 128); // 128 - 255 for pastel
  return `rgb(${r}, ${g}, ${b})`;
};

// Function to format the date consistently (show year if the event is in the future)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const currentYear = new Date().getFullYear(); // Get current year
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayOfWeek = dayOfWeekNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

  // Check if the event year is in the current year or not
  const finalDate = year === currentYear ? `${day} ${month}` : `${day} ${month} ${year}`;

  return {
    dayOfWeek,
    finalDate,
    time,
  };
};

// Function to calculate days remaining
const getDaysRemaining = (dateString) => {
  const oneDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
  const today = new Date();
  const eventDate = new Date(dateString);
  const diffDays = Math.round(Math.abs((today - eventDate) / oneDay));
  return diffDays;
};

export default function EventCard({ picURL, location, date, description }) {
  const [imageError, setImageError] = useState(false);
  const randomHoverColor = getRandomPastelColor(); // Generate a random pastel hover color
  const [daysRemaining, setDaysRemaining] = useState(getDaysRemaining(date));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDaysRemaining(getDaysRemaining(date));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date]);

  const { dayOfWeek, finalDate, time } = formatDate(date);

  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl mb-6">
      <CardHeader className="p-0">
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

        <p className="text-m font-semibold">{`${finalDate.toUpperCase()} | ${dayOfWeek.toUpperCase()} | ${time}`}</p>
        <p className="text-s font-bold">
          {daysRemaining < 14 ? `${daysRemaining} DAYS TO GO` : null}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className={`rounded-full text-lg px-8 py-6 font-bold`}
          style={{
            backgroundColor: "white", // Default background color
            color: "black", // Default text color
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = randomHoverColor; // Set pastel hover color
            e.currentTarget.style.color = "white"; // Change text color on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white"; // Reset to default
            e.currentTarget.style.color = "black"; // Reset text color
          }}
        >
          + Calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
