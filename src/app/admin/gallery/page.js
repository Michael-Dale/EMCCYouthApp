"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function GalleryPage() {
  const router = useRouter(); // Next.js Router for navigation
  const [imageData, setImageData] = useState({
    images: [], // To store multiple images
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setImageData({
      ...imageData,
      images: [...imageData.images, ...files], // Add new files to existing array
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each image to FormData
    imageData.images.forEach((file) => {
      formData.append("images[]", file); // 'images[]' allows multiple file uploads
    });

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Images uploaded successfully!");
        router.push("/admin"); // Redirect to /admin page after success
      } else {
        alert("Error uploading images!");
      }
    } catch (error) {
      console.error("Error submitting images:", error);
      alert("There was an error submitting the images.");
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Images to Gallery</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Multiple Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="images" className="text-gray-800 font-semibold">
              Upload Images
            </Label>
            <Input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              multiple // Allow multiple files to be selected
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Upload Images
          </Button>
        </form>
      </div>
    </div>
  );
}
