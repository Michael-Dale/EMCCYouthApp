"use client";
import React from "react";
import Image from "next/image";

const PdfThumbnail = ({ pdfUrl, title, imgSrc }) => {
  const handlePdfClick = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div
      onClick={handlePdfClick}
      className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
    >
      {/* Display a PDF thumbnail */}
      <Image
        src={imgSrc} // Use the imgSrc prop for the thumbnail image path
        alt="PDF Thumbnail"
        width={120}
        height={150}
        className="mx-auto mb-3"
      />
      <h3 className="text-center text-lg font-semibold text-gray-700">{title}</h3>
    </div>
  );
};

export default PdfThumbnail;
