import DevotionSkeleton from "@/app/components/skeletons/DevotionSkeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="border border-gray-300 rounded-2xl p-4 shadow-md max-w-md mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
        <DevotionSkeleton />
        <DevotionSkeleton />
        <DevotionSkeleton />
        <DevotionSkeleton />
        <DevotionSkeleton />
      </div>
    </>
  );
}
