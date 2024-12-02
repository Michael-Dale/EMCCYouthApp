"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function ManageEvents() {
  const router = useRouter(); // Next.js Router for navigation
  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    date: "",
    image: null,
  });

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
    // Handle form submission (e.g., send data to the server)
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("location", eventData.location);
    formData.append("date", eventData.date);
    if (eventData.image) {
      formData.append("image", eventData.image);
    }

    try {
      const response = await fetch("/api/admin/events", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Event created successfully!");
        router.push("/admin"); // Redirect to /admin page after success
      } else {
        alert("Error creating event!");
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-6">
      {/* Back Button */}
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
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
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

          {/* Location */}
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

          {/* Date Picker */}
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

          {/* Image Upload */}
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

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Create Event
          </Button>
        </form>
      </div>
    </div>
  );
}
