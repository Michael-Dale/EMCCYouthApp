"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function GalleryPage() {
  const router = useRouter(); // Next.js Router for navigation
  const [imageData, setImageData] = useState({
    images: [], // To store multiple images
  });
  const [galleryImages, setGalleryImages] = useState([]); // To store images from the database
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        setGalleryImages(data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    }

    fetchGalleryImages();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setImageData({
      ...imageData,
      images: [...imageData.images, ...files], // Add new files to existing array
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Placeholder URL logic to simulate storing the URL in the database
      const responses = await Promise.all(
        imageData.images.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);

          const response = await fetch("/api/images", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Error uploading image");
          }

          const data = await response.json();
          return data.url; // Assume API responds with a URL for the uploaded image
        })
      );

      console.log("Uploaded image URLs:", responses); // Log the URLs for now
      alert("Images uploaded successfully!");

      router.push("/admin/gallery"); // Redirect to /admin page after success
    } catch (error) {
      console.error("Error submitting images:", error);
      alert("There was an error submitting the images.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/images?id=${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting image");
      }

      alert("Image deleted successfully!");
      setGalleryImages(galleryImages.filter((image) => image.id !== parseInt(deleteId)));
      setDeleteId("");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("There was an error deleting the image.");
    }
  };

  return (
    // <div>
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
       {/* Delete Image Section */}
       <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white transition-shadow duration-200 hover:shadow-lg my-6">
        <h2 className="text-2xl font-bold text-center mb-4">Delete Image</h2>
        <form onSubmit={handleDelete} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="deleteId" className="text-gray-800 font-semibold">
              Select Image ID to Delete
            </Label>
            <select
              id="deleteId"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select ID</option>
              {galleryImages.map((image) => (
                <option key={image.id} value={image.id}>{image.id}</option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full mt-4 bg-red-600 hover:bg-red-700">
            Delete Image
          </Button>
        </form>
      </div>
      {/* </div> */}

      {/* Gallery Images Section */}
      <div className="my-6">
        <h2 className="text-2xl font-bold text-center mb-4">Gallery Images</h2>
        <div className="grid grid-cols-2 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="relative">
              <img src={image.image_url} alt={`Image ${image.id}`} className="w-32 h-32 object-cover border border-gray-300 rounded-md" />
              <span className="absolute top-1 left-1 bg-black text-white text-xs px-2 py-1 rounded">ID: {image.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
