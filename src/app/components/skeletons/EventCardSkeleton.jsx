import React from "react";

// Skeleton component for a single devotion post
const DevotionSkeleton = () => {
  return (
    <div className=" w-full max-w-sm mx-auto rounded-2xl mb-6 bg-white shadow-md  my-4 space-y-4 animate-pulse">
      <div className="relative w-full h-48 rounded-t-2xl overflow-hidden bg-gray-200"></div>

      {/* <div className="flex items-center mb-3">
        <div className="h-14 w-14 rounded-full mr-6 ml-4 bg-gray-200"></div>
        <div className="flex flex-col space-y-2">
          <div className="h-7 w-40 bg-gray-200 rounded"></div>
          <div className="h-5 w-36 bg-gray-200 rounded"></div>
        </div>
      </div> */}

      <div className="space-y-2 p-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>

        {/* Want to center this div */}
        <div className="h-10 bg-gray-200 rounded-2xl w-3/6 mx-auto"></div>
      </div>
    </div>
  );
};

export default DevotionSkeleton;
