"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Component() {
  const [imageError, setImageError] = useState(false);
  return (
    <Card className="w-full max-w-sm mx-auto rounded-xl">
      <CardHeader className="flex flex-col items-center space-y-2 pb-2">
        <div className="relative w-full h-48 bg-gray-200">
          {!imageError ? (
            <Image
              src="/pics/image.jpg"
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
        <p className="text-sm font-medium text-muted-foreground">
          Join us on a hike at Rietvlei trails
        </p>
        <div className="flex items-center space-x-2 ">
          <MapPin className="h-8 w-8 text-primary " />
          <p className="text-lg font-semibold"> Rietvlei Zoo</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="rounded-full text-lg px-8 py-6 font-bold hover:bg-yellow-400 hover:text-black">
          Directions
        </Button>
      </CardFooter>
    </Card>
  );
}
