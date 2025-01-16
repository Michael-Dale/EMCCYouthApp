"use client";
import PageTransition from "../components/PageTransition";
import DirectionCard from "../components/DirectionCard";
import GoogleFormLink from "../components/GoogleFormLink";
import MusicPlayer from "../components/MusicPlayer";
import SocialLinks from "../components/SocialLinks";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

export default function Info() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function fetchUpcomingEvents() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching latest devotion:", error);
        setEvents(false);
      }
    }
    fetchUpcomingEvents();
  }, []);

  // const img = "/pics/img.jpg";
  const img = "/pics/Facebook.png";
  return (
    <PageTransition>
      <div className="p-4">
        {/* <h1 className="text-2xl font-bold mb-4">Info</h1> */}
        {/* Your contact page content here */}

        {events &&
          events.map((event) => (
            <EventCard
              key={event.id}
              picURL={event.image_url}
              description={event.title}
              location={event.location}
              date={event.event_datetime}
            />
          ))}

        <DirectionCard />
        <GoogleFormLink
          formTitle="Google Form"
          formDescription="Sign up for our next event!"
          googleFormUrl="https://forms.gle/examplelink"
          imagePath={img}
        />
        <MusicPlayer playlistUrl="https://www.youtube.com/playlist?list=PLhQKtlhr7fgMF-WTGil-6ic8S4g5IM40P" />
      </div>

      <SocialLinks />
    </PageTransition>
  );
}
