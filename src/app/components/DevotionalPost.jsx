"use client";
import React from "react";
import Image from "next/image";
import { Copy } from "lucide-react";
import { useState, useCallback } from "react";

const Bluetick = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.25 12.5C22.25 11.07 21.37 9.83 20.06 9.16C20.52 7.77 20.26 6.26 19.25 5.25C18.24 4.24 16.73 3.98 15.34 4.44C14.68 3.13 13.43 2.25 12 2.25C10.57 2.25 9.33 3.13 8.67 4.44C7.27 3.98 5.76 4.24 4.75 5.25C3.74 6.26 3.49 7.77 3.95 9.16C2.64 9.83 1.75 11.07 1.75 12.5C1.75 13.93 2.64 15.17 3.95 15.84C3.49 17.23 3.74 18.74 4.75 19.75C5.76 20.76 7.27 21.01 8.66 20.56C9.33 21.87 10.57 22.75 12 22.75C13.43 22.75 14.68 21.87 15.34 20.56C16.73 21.01 18.24 20.76 19.25 19.75C20.26 18.74 20.52 17.23 20.06 15.84C21.37 15.17 22.25 13.93 22.25 12.5ZM10.54 16.7L6.8 12.96L8.21 11.54L10.47 13.8L15.27 8.57L16.74 9.93L10.54 16.7Z"
      fill="#1D9BF0"
    />
  </svg>
);

const formatDate = (date) => {
  const dateString = new Date(date);
  // Format time
  const hours = dateString.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = dateString.getMinutes().toString().padStart(2, "0");
  const ampm = dateString.getHours() >= 12 ? "PM" : "AM";

  // Format dateString
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[dateString.getMonth()];
  const day = dateString.getDate();
  const year = dateString.getFullYear();

  return `${hours}:${minutes}${ampm} · ${month} ${day} ${year} ·  `;
};

const DevotionalPost = ({ verse, message, date }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (navigator.clipboard && window.isSecureContext) {
      // navigator.clipboard is available in secure contexts (https)
      navigator.clipboard
        .writeText(verse + message)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      // Fallback for iOS and insecure contexts
      const textToCopy = verse + message;
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      // Prevent scrolling to the bottom of the page
      textArea.style.position = "fixed";
      textArea.style.top = 0;
      textArea.style.left = 0;
      textArea.style.opacity = 0;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  }, [verse, message]);

  return (
    <div className="devotional-post border border-gray-300 rounded-2xl p-4 shadow-md max-w-sm mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
      {/* Header with Profile Picture and Username */}
      <div className="flex items-center mb-3">
        {/* <img
          src={profilePic}
          alt={`${username}'s profile`}
          className="w-20 h-20 rounded-full mr-3"
        /> */}
        <Image
          data-testid="close-icon"
          src="/icons/connect youth logo.svg"
          alt={`ConnectYouth's profile`}
          height="80"
          width="80"
          className="rounded-full mr-2"
        />
        <div>
          <div className="flex items-center">
            {" "}
            <span className="text-gray-800 font-semibold text-xl mr-1">
              ConnectYouth
            </span>
            <Bluetick className="w-3 h-3 " />
          </div>

          {/* Add the DailyDevotional text */}
          <div className="text-gray-600 text-sm mt-0.5">@DailyDevotional</div>
        </div>
      </div>

      {/* Verse and Message */}
      <div className="verse text-grey-800 italic mb-2 text-xl">"{verse}"</div>
      <div className="message text-grey-800 text-xl">{message}</div>
      <div className="mt-1 flex items-center text-sm ml-1">
        <span className="text-gray-500 mr-1">{formatDate(date)}</span>

        <button className="" onClick={handleCopy}>
          <Copy className="w-3 h-3 text-gray-500" />
        </button>
        {copied ? (
          <span className="text-gray-500 ml-2 transition duration-700 ease-in-out ">
            {" "}
            Copied
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default DevotionalPost;
