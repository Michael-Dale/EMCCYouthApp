"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import EventCard from "@/app/components/EventCard";

export default function ManageEvents() {
  const router = useRouter();
  const [events, setEvents] = useState(null);
  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    date: "",
    image: null,
  });
  const [eventToDelete, setEventToDelete] = useState(""); // State to track the selected event to delete

  useEffect(() => {
    async function fetchUpcomingEvents() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching latest events:", error);
        setEvents(false);
      }
    }

    fetchUpcomingEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventData({
      ...eventData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("location", eventData.location);
    formData.append("date", eventData.date);
    if (eventData.image) {
      formData.append("image", eventData.image);
    }

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Event created successfully!");
        router.push("/admin");
      } else {
        alert("Error creating event!");
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("There was an error submitting the form.");
    }
  };

  const handleDelete = async () => {
    if (!eventToDelete) {
      alert("Please select an event to delete.");
      return;
    }

    try {
      const response = await fetch(`/api/events?id=${eventToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Event deleted successfully!");
        setEvents(events.filter((event) => event.id !== eventToDelete)); // Update the events list
      } else {
        alert("Error deleting event!");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("There was an error deleting the event.");
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto my-6">
        <div className="mb-6 flex justify-start">
          <Button
            type="button"
            onClick={() => router.push("/admin")}
            className="bg-black text-white rounded-full px-4 py-2 shadow-md hover:bg-blue-600"
          >
            Back to Admin
          </Button>
        </div>

        <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white transition-shadow duration-200 hover:shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Event
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-800 font-semibold">
                Event Title
              </Label>
              <Input
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-800 font-semibold">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-800 font-semibold">
                Event Date and Time
              </Label>
              <Input
                type="datetime-local"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-800 font-semibold">
                Upload Event Image
              </Label>
              <Input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Create Event
            </Button>
          </form>
        </div>
      </div>

      {/* Delete Event Form */}
      <div className="max-w-md mx-auto my-6">
        <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white transition-shadow duration-200 hover:shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Delete Event
          </h1>

          {/* Dropdown to select an event to delete */}
          <div className="space-y-2">
            <Label htmlFor="eventToDelete" className="text-gray-800 font-semibold">
              Select Event to Delete
            </Label>
            <select
              id="eventToDelete"
              name="eventToDelete"
              value={eventToDelete}
              onChange={(e) => setEventToDelete(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Select Event --</option>
              {events &&
                events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} - {new Date(event.event_datetime).toLocaleString()}
                  </option>
                ))}
            </select>
          </div>

          <Button
            type="button"
            onClick={handleDelete}
            className="w-full mt-4 bg-red-600 hover:bg-red-700"
          >
            Delete Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mt-8">
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
      </div>
    </div>
  );
}
