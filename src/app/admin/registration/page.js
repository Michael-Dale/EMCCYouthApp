"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import GoogleFormLink from "../../components/GoogleFormLink";

export default function ManageRegistrationLink() {
  const router = useRouter();
  const [googleForm, setGoogleForm] = useState(null);
  const [formLinks, setFormLinks] = useState([]); // Holds all form links
  const [selectedFormId, setSelectedFormId] = useState(""); // Selected form for deletion
  const [registrationData, setRegistrationData] = useState({
    title: "",
    description: "",
    image: null,
    form_link: "",
  });

  const fetchFormLinksAndLatest = async () => {
    try {
      // Fetch all form links
      const allResponse = await fetch("/api/form-link");
      if (allResponse.ok) {
        const allData = await allResponse.json();
        setFormLinks(allData);
      } else {
        console.error("Failed to fetch form links.");
      }

      // Fetch the latest form link
      const latestResponse = await fetch("/api/form-link?latest=true");
      if (latestResponse.ok) {
        const latestData = await latestResponse.json();
        setGoogleForm(latestData);
      } else {
        console.error("Failed to fetch the latest form link.");
      }
    } catch (error) {
      console.error("Error fetching form links:", error);
    }
  };

  useEffect(() => {
    fetchFormLinksAndLatest();
  }, []);

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
    const formData = new FormData();
    formData.append("title", registrationData.title);
    formData.append("description", registrationData.description);
    formData.append("form_link", registrationData.form_link);
    if (registrationData.image) {
      formData.append("form_image", registrationData.image);
    }

    try {
      const response = await fetch("/api/form-link", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Registration link created successfully!");
        await fetchFormLinksAndLatest(); // Fetch the updated data
      } else {
        alert("Error creating registration link!");
      }
    } catch (error) {
      console.error("Error submitting registration link:", error);
      alert("There was an error submitting the form.");
    }
  };

  const handleDelete = async () => {
    if (!selectedFormId) {
      alert("Please select a form to delete.");
      return;
    }

    try {
      const response = await fetch(`/api/form-link?id=${selectedFormId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Form link deleted successfully!");
        await fetchFormLinksAndLatest(); // Fetch the updated data
        setSelectedFormId(""); // Reset selected form ID
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting form link:", error);
      alert("There was an error deleting the form link.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-6">
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Registration Link
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-gray-800 font-semibold"
            >
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

          <div className="space-y-2">
            <Label htmlFor="form_link" className="text-gray-800 font-semibold">
              Google Form URL
            </Label>
            <Input
              type="url"
              id="form_link"
              name="form_link"
              value={registrationData.form_link}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Create Registration Link
          </Button>
        </form>
      </div>
      {/* Delete Form */}
      <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md bg-white transition-shadow duration-200 hover:shadow-lg mt-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Delete Registration Link
        </h1>

        <div className="space-y-2">
          <Label htmlFor="formToDelete" className="text-gray-800 font-semibold">
            Select Registration Link to Delete
          </Label>
          <select
            id="formToDelete"
            name="formToDelete"
            value={selectedFormId}
            onChange={(e) => setSelectedFormId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select Registration Link --</option>
            {formLinks.map((formLink) => (
              <option key={formLink.id} value={formLink.id}>
                {formLink.title}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="button"
          onClick={handleDelete}
          className="w-full mt-4 bg-red-600 hover:bg-red-700"
        >
          Delete Registration Link
        </Button>
      </div>
        {formLinks.length > 0 && (
          <div className="mt-6 space-y-4">
            {formLinks.map((form) => (
              <GoogleFormLink
                key={form.id}
                formTitle={form.title}
                formDescription={form.description}
                googleFormUrl={form.form_link}
                imagePath={
                  form.form_image_url ||
                  "/placeholders/form_image_placeholder.png"
                }
              />
            ))}
          </div>
        )}
      </div>
  );
}
