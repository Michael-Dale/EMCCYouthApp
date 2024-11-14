import DevotionSkeleton from "@/app/components/skeletons/DevotionSkeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      <DevotionSkeleton />
      <DevotionSkeleton />
      <DevotionSkeleton />
      <DevotionSkeleton />
      <DevotionSkeleton />
    </>
  );
}
