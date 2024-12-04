"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import DevotionalPost from "@/app/components/DevotionalPost";

export default function ManageDevotions() {
  const [selectedDevotionId, setSelectedDevotionId] = useState(""); // Track selected devotion ID for deletion
  const router = useRouter(); // Next.js Router for navigation
  const [devotions, setDevotions] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);  // Add a refresh key
  const [devotionData, setDevotionData] = useState({
    verse: "",
    message: "",
    date: "",
  });
  
  useEffect(() => {
    async function fetchDevotions() {
      try {
        const response = await fetch("/api/devotions");
        const data = await response.json();
        setDevotions(data);
      } catch (error) {
        console.error("Error fetching devotions:", error);
        setDevotions([]);
      }
    }
    fetchDevotions();
  }, [refreshKey]); // Re-fetch devotions whenever refreshKey changes
  
  const handleDelete = async (e) => {
    e.preventDefault();
  
    if (!selectedDevotionId) {
      alert("Please select a devotion to delete!");
      return;
    }
  
    try {
      const response = await fetch(`/api/devotions?id=${selectedDevotionId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Devotion deleted successfully!");
  
        // Trigger refresh by changing the refresh key
        setRefreshKey(prevKey => prevKey + 1); // This will trigger a re-fetch of devotions
        setSelectedDevotionId(""); // Clear the selected devotion
      } else {
        alert("Error deleting devotion!");
      }
    } catch (error) {
      console.error("Error deleting devotion:", error);
      alert("There was an error deleting the devotion.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDevotionData({
      ...devotionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure the datetime format is correct
    const formattedDate = new Date(devotionData.date).toISOString(); // Convert to ISO format for backend
  
    const devotionToSubmit = {
      ...devotionData,
      devotion_datetime: formattedDate, // Ensure we're sending the correctly formatted date
    };
  
    try {
      const response = await fetch("/api/devotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(devotionToSubmit),
      });
  
      if (response.ok) {
        alert("Devotion created successfully!");
        
        // Trigger refresh by changing the refresh key
        setRefreshKey(prevKey => prevKey + 1); // This will trigger a re-fetch of devotions
      } else {
        alert("Error creating devotion!");
      }
    } catch (error) {
      console.error("Error submitting devotion:", error);
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

        {/* Create Devotion Form */}
        <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white transition-shadow duration-200 hover:shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Devotion
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <Button type="submit" className="w-full mt-4">
              Create Devotion
            </Button>
          </form>
        </div>

        {/* Delete Devotion Form */}
        <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white mt-8">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            Delete Devotion
          </h2>
          <form onSubmit={handleDelete} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="deleteDevotion" className="text-gray-800 font-semibold">
                Select a Devotion to Delete
              </Label>
              <select
                id="deleteDevotion"
                value={selectedDevotionId}
                onChange={(e) => setSelectedDevotionId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>
                  Select a devotion
                </option>
                {devotions &&
                  devotions.map((devotion) => {
                    // Extract only the book, chapter, and verse number
                    const shortenedVerse = devotion.verse.split(" - ")[0];
                    return (
                      <option key={devotion.id} value={devotion.id}>
                        {`${shortenedVerse} (${new Date(
                          devotion.devotion_datetime
                        ).toLocaleDateString()})`}
                      </option>
                    );
                  })}
              </select>
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Delete Devotion
            </Button>
          </form>
        </div>
      </div>

      {/* Display Devotions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mt-8">
        {devotions &&
          devotions.map((devotion) => (
            <DevotionalPost
              key={devotion.id}
              verse={devotion.verse}
              message={devotion.message}
              date={devotion.devotion_datetime}
            />
          ))}
      </div>
    </div>
  );
}
