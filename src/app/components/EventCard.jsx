"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Component({ picURL, location, time, description }) {
  const [imageError, setImageError] = useState(false);
  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl mb-6">
      {/* Removed padding from CardHeader */}
      <CardHeader className="p-0">
        {/* Added rounding to the top of the image container */}
        <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
          {!imageError ? (
            <Image
              src={picURL}
              alt="Rietvlei trails"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <span>Image not available</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-center">
      <p className="text-xl font-extrabold">{description}</p>
      <p className="text-m font-medium text-muted-foreground">{location}</p>
        <p className="text-m font-semibold">{time}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
           className={`rounded-full text-lg px-8 py-6 font-bold hover:bg-${color}-400 hover:text-black`}
        >
          + Calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
