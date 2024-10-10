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

export default function Component({
  picURL,
  location,
  time,
  description,
  color,
}) {
  const [imageError, setImageError] = useState(false);
  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl mb-6 ">
      <CardHeader className="flex flex-col items-center space-y-2 pb-2">
        <div className="relative w-full h-48 bg-gray-200">
          {!imageError ? (
            <Image
              src={picURL}
              alt="Rietvlei trails"
              layout="fill"
              objectFit="cover"
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
        <p className="text-xl font-extrabold ">{description}</p>

        <p className="text-m font-medium text-muted-foreground ">{location}</p>
        <p className="text-m font-semibold">{time}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className={`rounded-full text-lg px-8 py-6 font-bold hover:bg-${color}-400 hover:text-black `}
        >
          + Calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
