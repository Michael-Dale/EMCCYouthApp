"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Form() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactInfo: "",
    moreInfo: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { isAnonymous, ...formData });
    // Handle form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-background rounded-lg shadow-md"
    >
      <RadioGroup
        defaultValue="non-anonymous"
        onValueChange={(value) => setIsAnonymous(value === "anonymous")}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="non-anonymous" id="non-anonymous" />
          <Label htmlFor="non-anonymous">Non-Anonymous</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="anonymous" id="anonymous" />
          <Label htmlFor="anonymous">Anonymous</Label>
        </div>
      </RadioGroup>

      <div className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
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
          <Label htmlFor="lastName">Last Name</Label>
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
          <Label htmlFor="contactInfo">Phone number/email</Label>
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
          <Label htmlFor="moreInfo">More Info</Label>
          <Select
            name="moreInfo"
            onValueChange={(value) =>
              handleInputChange({ target: { name: "moreInfo", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prayer">Prayer requests</SelectItem>
              <SelectItem value="suggestions">Suggestions</SelectItem>
              <SelectItem value="counseling">Counseling</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
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
  );
}
