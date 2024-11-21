"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function ManageRegistrationLink() {
  const router = useRouter(); // Next.js Router for navigation
  const [registrationData, setRegistrationData] = useState({
    title: "",
    description: "",
    image: null,
    googleFormUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegistrationData({
      ...registrationData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    const formData = new FormData();
    formData.append("title", registrationData.title);
    formData.append("description", registrationData.description);
    formData.append("googleFormUrl", registrationData.googleFormUrl);
    if (registrationData.image) {
      formData.append("image", registrationData.image);
    }

    try {
      const response = await fetch("/api/admin/registration-link", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Registration link created successfully!");
        router.push("/admin"); // Redirect to /admin page after success
      } else {
        alert("Error creating registration link!");
      }
    } catch (error) {
      console.error("Error submitting registration link:", error);
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Registration Link</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-800 font-semibold">
              Registration Title
            </Label>
            <Input
              id="title"
              name="title"
              value={registrationData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-800 font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={registrationData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-800 font-semibold">
              Upload Image
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

          {/* Google Form URL */}
          <div className="space-y-2">
            <Label htmlFor="googleFormUrl" className="text-gray-800 font-semibold">
              Google Form URL
            </Label>
            <Input
              type="url"
              id="googleFormUrl"
              name="googleFormUrl"
              value={registrationData.googleFormUrl}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Create Registration Link
          </Button>
        </form>
      </div>
    </div>
  );
}
