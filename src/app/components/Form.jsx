"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function StyledForm() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactInfo: "",
    requestType: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAnonymous, ...formData }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      const data = await response.json();
      console.log(data.message); // "Email sent successfully"
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-wrapper border border-gray-300 rounded-2xl p-6 shadow-md max-w-md mx-auto my-6 bg-grey transition-shadow duration-200 hover:shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <Label htmlFor="anonymous" className="text-gray-800 font-semibold">Submit anonymously</Label>
          <button
            type="button"
            aria-pressed={isAnonymous}
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-200 focus:outline-none ${isAnonymous ? "bg-blue-500" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block w-5 h-5 transform rounded-full bg-white transition-transform duration-200 ${isAnonymous ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName" className="text-gray-800">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={isAnonymous}
              className={isAnonymous ? "bg-muted text-muted-foreground" : ""}
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-gray-800">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={isAnonymous}
              className={isAnonymous ? "bg-muted text-muted-foreground" : ""}
            />
          </div>
          <div>
            <Label htmlFor="contactInfo" className="text-gray-800">Phone number/email</Label>
            <Input
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              disabled={isAnonymous}
              className={isAnonymous ? "bg-muted text-muted-foreground" : ""}
            />
          </div>
          <div>
            <Label htmlFor="requestType" className="text-gray-800">Select Request Type</Label>
            <Select
              name="requestType"
              onValueChange={(value) => handleInputChange({ target: { name: "requestType", value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="moreInfo">More Info</SelectItem>
                <SelectItem value="prayer">Prayer Requests</SelectItem>
                <SelectItem value="suggestions">Suggestions</SelectItem>
                <SelectItem value="counseling">Counseling</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="message" className="text-gray-800">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
