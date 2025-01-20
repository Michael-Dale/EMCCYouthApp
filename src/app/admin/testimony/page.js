"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import BlogPostSnippet from "../../components/BlogPostSnippet";
import { useEffect } from "react";

export default function ManageTestimonies() {
  const router = useRouter(); // Next.js Router for navigation
  const [testimonies, setTestimonies] = useState([]);
  const [selectedTestimonyId, setSelectedTestimonyId] = useState(""); // Tracks the selected testimony ID
  const [testimonyData, setTestimonyData] = useState({
    title: "",
    author: "",
    dateTime: "",
    message: "",
  });

 

  const fetchTestimonies = async () => {
    try {
      const response = await fetch("/api/testimonies");
      const data = await response.json();
      setTestimonies(data);
    } catch (error) {
      console.error("Error fetching testimonies:", error);
    }
  };

 useEffect(() => {

    fetchTestimonies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonyData({
      ...testimonyData,
      [name]: value,
    });
  };

  const handleDelete = async () => {
    if (!selectedTestimonyId) {
      alert("Please select a testimony to delete.");
      return;
    }
  
    try {
      const response = await fetch("/api/testimonies", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedTestimonyId }),
      });
  
      if (response.ok) {
        alert("Testimony deleted successfully!");
        setSelectedTestimonyId("");
        await fetchTestimonies(); // Refresh testimonies
      } else {
        alert("Error deleting testimony!");
      }
    } catch (error) {
      console.error("Error deleting testimony:", error);
      alert("There was an error deleting the testimony.");
    }
  };
  
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/testimonies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testimonyData),
    });

    if (response.ok) {
      alert("Testimony created successfully!");
      setTestimonyData({
        title: "",
        author: "",
        dateTime: "",
        message: "",
      });
      await fetchTestimonies(); // Refresh testimonies
    } else {
      alert("Error creating testimony!");
    }
  } catch (error) {
    console.error("Error submitting testimony:", error);
    alert("There was an error submitting the form.");
  }
};

  

  return (
    <div>
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Testimony
          </h1>

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
        <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white transition-shadow duration-200 hover:shadow-lg mt-6">
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
    Delete Testimony
  </h1>

  <div className="space-y-2">
    <Label htmlFor="testimonyToDelete" className="text-gray-800 font-semibold">
      Select Testimony to Delete
    </Label>
    <select
      id="testimonyToDelete"
      name="testimonyToDelete"
      value={selectedTestimonyId}
      onChange={(e) => setSelectedTestimonyId(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="">-- Select Testimony --</option>
      {testimonies.map((testimony) => (
        <option key={testimony.id} value={testimony.id}>
          {`${testimony.title} - ${testimony.author}`}
        </option>
      ))}
    </select>
  </div>

  <Button
    type="button"
    onClick={handleDelete}
    className="w-full mt-4 bg-red-600 hover:bg-red-700"
  >
    Delete Testimony
  </Button>
</div>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mt-8">
        {testimonies.length > 0 ? (
          testimonies.map((post) => (
            <div key={post.id} className="mb-4">
              <BlogPostSnippet
                id={post.id}
                name={post.author}
                date={post.post_datetime}
                title={post.title}
                content={post.message}
              />
            </div>
          ))
        ) : (
          <div>Loading testimonies...</div>
        )}
      </div>
    </div>
  );
}
