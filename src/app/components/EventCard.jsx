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
  const currentYear = new Date().getFullYear();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const dayOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayOfWeek = dayOfWeekNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const finalDate =
    year === currentYear ? `${day} ${month}` : `${day} ${month} ${year}`;

  return {
    dayOfWeek,
    finalDate,
    time,
  };
};

// Function to calculate days remaining
const getDaysRemaining = (dateString) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const eventDate = new Date(dateString);
  const diffDays = Math.round(Math.abs((today - eventDate) / oneDay));
  return diffDays;
};

export default function EventCard({ picURL, location, date, description }) {
  const [imageError, setImageError] = useState(false);
  const randomHoverColor = getRandomPastelColor();
  const [daysRemaining, setDaysRemaining] = useState(getDaysRemaining(date));
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDaysRemaining(getDaysRemaining(date));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date]);

  const { dayOfWeek, finalDate, time } = formatDate(date);

  const generateICalFile = () => {
    const eventDate = new Date(date);
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);

    const formatICalDate = (d) => {
      return d.toISOString()
        .replace(/[-:]/g, '')
        .split('.')[0] + 'Z';
    };

    const icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Connect Youth//Event Calendar//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${formatICalDate(eventDate)}`,
      `DTEND:${formatICalDate(endDate)}`,
      `DESCRIPTION:Event details for ${description}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icalContent], { type: 'text/calendar' });
    return URL.createObjectURL(blob);
  };

  const handleAddToCalendar = () => {
    setIsCalendarDialogOpen(true);
  };

  const handleGoogleCalendar = () => {
    const eventDate = new Date(date);
    const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000)
      .toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(description)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarLink, '_blank');
    setIsCalendarDialogOpen(false);
  };

  const handleiOSCalendar = () => {
    const link = document.createElement('a');
    link.href = generateICalFile();
    link.download = `${description.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsCalendarDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsCalendarDialogOpen(false);
  };

  return (
    <div className="relative">
  <Card className="w-full max-w-sm mx-auto rounded-2xl mb-6">
    <CardHeader className="p-0">
      <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
        {!imageError ? (
          <Image
            src={picURL}
            alt="Event Image"
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
        {daysRemaining < 14
          ? `${daysRemaining} ${daysRemaining <= 1 ? "DAY" : "DAYS"} TO GO`
          : null}
      </p>
    </CardContent>
    <CardFooter className="flex justify-center">
      <Button
        onClick={handleAddToCalendar}
        className={`rounded-full text-lg px-8 py-6 font-bold`}
        style={{
          backgroundColor: "white",
          color: "black",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = randomHoverColor;
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.color = "black";
        }}
      >
        + Calendar
      </Button>
    </CardFooter>
  </Card>

  {isCalendarDialogOpen && (
    <div
      className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white rounded-lg p-6 shadow-md z-10"
      onClick={handleCloseDialog}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Add to Calendar</h2>
        <p className="text-gray-600 mb-4">Choose how you want to add this event</p>

        <div className="space-y-2">
          <button
            onClick={handleGoogleCalendar}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Add to Google Calendar
          </button>

          <button
            onClick={handleiOSCalendar}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Add to iOS/Apple Calendar
          </button>

          <button
            onClick={handleCloseDialog}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}
