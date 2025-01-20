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
  const [googleForm, setGoogleForm] = useState(null);

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

    async function fetchGoogleForm() {
      try {
        const response = await fetch("/api/form-link?latest=true");
        const data = await response.json();
        setGoogleForm(data);
      } catch (error) {
        console.error("Error fetching Google Form link:", error);
        setGoogleForm(false);
      }
    }

    fetchUpcomingEvents();
    fetchGoogleForm();
  }, []);

  return (
    <PageTransition>
      <div className="p-4">
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

        {googleForm && (
          <GoogleFormLink
            formTitle={googleForm.title}
            formDescription={googleForm.description}
            googleFormUrl={googleForm.form_link}
            imagePath={googleForm.form_image_url}
          />
        )}

        <MusicPlayer playlistUrl="https://www.youtube.com/playlist?list=PLhQKtlhr7fgMF-WTGil-6ic8S4g5IM40P" />
      </div>

      <SocialLinks />
    </PageTransition>
  );
}
