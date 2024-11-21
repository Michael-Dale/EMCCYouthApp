"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function ManageTestimonies() {
  const router = useRouter(); // Next.js Router for navigation
  const [testimonyData, setTestimonyData] = useState({
    title: "",
    author: "",
    dateTime: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonyData({
      ...testimonyData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    try {
      const response = await fetch("/api/admin/testimonies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonyData),
      });

      if (response.ok) {
        alert("Testimony created successfully!");
        router.push("/admin"); // Redirect to /admin page after success
      } else {
        alert("Error creating testimony!");
      }
    } catch (error) {
      console.error("Error submitting testimony:", error);
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
          className="bg-blue-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-blue-600"
        >
          Back to Admin
        </Button>
      </div>

      <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white transition-shadow duration-200 hover:shadow-lg">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Testimony</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-800 font-semibold">
              Testimony Title
            </Label>
            <Input
              id="title"
              name="title"
              value={testimonyData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author" className="text-gray-800 font-semibold">
              Author
            </Label>
            <Input
              id="author"
              name="author"
              value={testimonyData.author}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label htmlFor="dateTime" className="text-gray-800 font-semibold">
              Date and Time
            </Label>
            <Input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={testimonyData.dateTime}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-800 font-semibold">
              Testimony Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={testimonyData.message}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Create Testimony
          </Button>
        </form>
      </div>
    </div>
  );
}
