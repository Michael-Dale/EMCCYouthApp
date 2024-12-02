"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function ManageSermons() {
  const router = useRouter(); // Next.js Router for navigation
  const [sermonData, setSermonData] = useState({
    title: "",
    pdf: null,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSermonData({
      ...sermonData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSermonData({
      ...sermonData,
      [name]: files[0], // Only take the first file in case multiple are selected
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    const formData = new FormData();
    formData.append("title", sermonData.title);
    if (sermonData.pdf) {
      formData.append("pdf", sermonData.pdf);
    }
    if (sermonData.image) {
      formData.append("image", sermonData.image);
    }

    try {
      const response = await fetch("/api/admin/sermons", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Sermon created successfully!");
        router.push("/admin"); // Redirect to /admin page after success
      } else {
        alert("Error creating sermon!");
      }
    } catch (error) {
      console.error("Error submitting sermon:", error);
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Sermon</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-800 font-semibold">
              Sermon Title
            </Label>
            <Input
              id="title"
              name="title"
              value={sermonData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* PDF Upload */}
          <div className="space-y-2">
            <Label htmlFor="pdf" className="text-gray-800 font-semibold">
              Upload Sermon PDF
            </Label>
            <Input
              type="file"
              id="pdf"
              name="pdf"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-800 font-semibold">
              Upload Sermon Image
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
            Create Sermon
          </Button>
        </form>
      </div>
    </div>
  );
}
