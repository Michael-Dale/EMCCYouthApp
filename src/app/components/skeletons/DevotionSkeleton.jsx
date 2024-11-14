import React from "react";

// Skeleton component for a single devotion post
const DevotionSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md max-w-sm mx-auto my-4 space-y-4 animate-pulse">
      {/* Verse skeleton */}

      <div className="flex items-center mb-3">
        <div className="h-14 w-14 rounded-full mr-6 ml-4 bg-gray-200"></div>
        <div className="flex flex-col space-y-2">
          <div className="h-7 w-40 bg-gray-200 rounded"></div>
          <div className="h-5 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
      {/* Date skeleton */}

      {/* Message skeleton - multiple lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-3/6"></div>

        {/* <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-3 bg-gray-200 rounded w-1/6"></div> */}
      </div>
    </div>
  );
};

export default DevotionSkeleton;
