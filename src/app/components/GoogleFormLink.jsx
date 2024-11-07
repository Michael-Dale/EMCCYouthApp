"use client";
import Link from "next/link";
import Image from "next/image";

const GoogleFormLink = ({ formTitle, formDescription, googleFormUrl, imagePath }) => {
  return (
    <div className="w-full max-w-sm border rounded-md shadow-md bg-white text-center m-6 mx-auto">
      {/* Outer div to control the full size of the image */}
      <div className="relative w-full mb-4 overflow-hidden rounded-t-md">
        {imagePath ? (
          <Image
            src={imagePath}
            alt="Google Form Image"
            layout="responsive"
            width={700}  // Set a reasonable width for responsive behavior
            height={400} // Set a reasonable height to maintain aspect ratio
            objectFit="cover"
            className="w-full h-full"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <span>No Image Available</span>
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-2">{formTitle}</h2>
      <p className="text-gray-600 mb-4">{formDescription}</p>
      <Link
        href={googleFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline font-medium"
      >
        Open Form
      </Link>
    </div>
  );
};

export default GoogleFormLink;
