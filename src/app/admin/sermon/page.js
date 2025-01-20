"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PdfThumbnail from "../../components/PdfThumbnail";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function ManageSermons() {
  const router = useRouter();
  const [sermons, setSermons] = useState([]);
  const [sermonData, setSermonData] = useState({
    title: "",
    pdf: null,
    image: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    pdfUrl: "",
    imageUrl: "",
  });
  const [sermonToDelete, setSermonToDelete] = useState(""); // Selected sermon ID for deletion

  // Fetch all sermons
  useEffect(() => {
    async function fetchSermons() {
      try {
        const response = await fetch("/api/sermons");
        if (!response.ok) throw new Error("Failed to fetch sermons");
        const data = await response.json();
        setSermons(data);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      }
    }

    fetchSermons();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSermonData({
      ...sermonData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setSermonData({
        ...sermonData,
        [name]: files[0],
      });
    }
  };

  // Handle sermon submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", sermonData.title);
    if (sermonData.pdf) {
      formData.append("pdf", sermonData.pdf);
    }
    if (sermonData.image) {
      formData.append("image", sermonData.image);
    }

    try {
      const response = await fetch("/api/sermons", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        // Assuming the API returns the file URLs
        setUploadedFiles({
          pdfUrl: result.pdf_url,
          imageUrl: result.image_url,
        });

        alert("Sermon created successfully!");
        router.push("/admin/sermon");
      } else {
        alert("Error creating sermon!");
      }
    } catch (error) {
      console.error("Error submitting sermon:", error);
      alert("There was an error submitting the form.");
    }
  };

  // Handle sermon deletion
  const handleDelete = async () => {
    if (!sermonToDelete) {
      alert("Please select a sermon to delete.");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this sermon?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/sermons?id=${sermonToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Sermon deleted successfully!");
        setSermons(sermons.filter((sermon) => sermon.id !== parseInt(sermonToDelete)));
        setSermonToDelete("");
        router.push("/admin/sermon");
      } else {
        alert("Error deleting sermon.");
      }
    } catch (error) {
      console.error("Error deleting sermon:", error);
      alert("There was an error deleting the sermon.");
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

        {/* Create Sermon Form */}
        <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white transition-shadow duration-200 hover:shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Sermon
          </h1>

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

            <Button type="submit" className="w-full mt-4">
              Create Sermon
            </Button>
          </form>
        </div>

        {/* Delete Sermon Form */}
        <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white transition-shadow duration-200 hover:shadow-lg mt-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Delete Sermon
          </h1>

          <div className="space-y-2">
            <Label htmlFor="sermonToDelete" className="text-gray-800 font-semibold">
              Select Sermon to Delete
            </Label>
            <select
              id="sermonToDelete"
              name="sermonToDelete"
              value={sermonToDelete}
              onChange={(e) => setSermonToDelete(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Select Sermon --</option>
              {sermons.map((sermon) => (
                <option key={sermon.id} value={sermon.id}>
                  {sermon.title}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="button"
            onClick={handleDelete}
            className="w-full mt-4 bg-red-600 hover:bg-red-700"
          >
            Delete Sermon
          </Button>
        </div>
      </div>

      {/* Sermon Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mt-8">
        {sermons.map((sermon) => (
          <div
            key={sermon.id}
            className="border border-gray-300 rounded-lg p-4 shadow-md w-full max-w-md bg-white"
          >
            <PdfThumbnail
              pdfUrl={sermon.sermon_pdf_url}
              title={sermon.title}
              imgSrc={sermon.sermon_image_url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
