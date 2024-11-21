"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function ManageDevotions() {
  const router = useRouter(); // Next.js Router for navigation
  const [devotionData, setDevotionData] = useState({
    verse: "",
    message: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDevotionData({
      ...devotionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    const formData = new FormData();
    formData.append("verse", devotionData.verse);
    formData.append("message", devotionData.message);
    formData.append("date", devotionData.date);

    try {
      const response = await fetch("/api/admin/devotions", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Devotion created successfully!");
        router.push("/admin"); // Redirect to /admin page after success
      } else {
        alert("Error creating devotion!");
      }
    } catch (error) {
      console.error("Error submitting devotion:", error);
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Devotion</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Verse */}
          <div className="space-y-2">
            <Label htmlFor="verse" className="text-gray-800 font-semibold">
              Verse
            </Label>
            <Input
              id="verse"
              name="verse"
              value={devotionData.verse}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-800 font-semibold">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={devotionData.message}
              onChange={handleInputChange}
              className="min-h-[100px] w-full p-2 border border-gray-300 rounded-md"
              maxLength="255"
              required
            />
            <p className="text-gray-500 text-sm mt-1">
              {devotionData.message.length}/255 characters
            </p>
          </div>

          {/* Date Picker (Datetime) */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-800 font-semibold">
              Devotion Date and Time
            </Label>
            <Input
              type="datetime-local"
              id="date"
              name="date"
              value={devotionData.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Create Devotion
          </Button>
        </form>
      </div>
    </div>
  );
}
