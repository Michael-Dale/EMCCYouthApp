"use client";

import { useState } from "react";
import { Play, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react"; // Import necessary icons
import { Button } from "@/components/ui/button"; // Ensure this path is correct
import { Slider } from "@/components/ui/slider"; // Ensure this path is correct
import Link from "next/link"; // Import Link to navigate to the playlist

export default function MusicPlayer({ playlistUrl, songName = "Connect Youth Playlist" }) {
  const [currentTime, setCurrentTime] = useState(196); // Static current time (3:16)
  const [duration, setDuration] = useState(216); // Static duration (3:36)

  // Handler to update current time when seek bar changes
  const handleSeek = (newValue) => {
    const [seekTime] = newValue;
    setCurrentTime(seekTime);
  };

  // Function to format time into minutes:seconds format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border-2 border-gray-300 rounded-lg shadow-md relative mx-auto">
      {/* Song Name */}
      <div className="text-center text-lg font-semibold mb-4">{songName}</div>

      {/* Button Controls (Shuffle, Skip, Play, Replay) */}
      <div className="flex justify-between items-center mb-4">
        {/* Shuffle Button (Left) */}
        <Link href={playlistUrl} target="_blank" passHref>
          <Button
            aria-label="Shuffle Playlist"
            className="w-12 h-12 bg-transparent text-black hover:bg-gray-100 p-0 shadow-none"
          >
            <Shuffle className="h-6 w-6" />
          </Button>
        </Link>

        {/* Skip Previous Button */}
        <Link href={playlistUrl} target="_blank" passHref>
          <Button
            aria-label="Skip Previous"
            className="w-12 h-12 bg-transparent text-black hover:bg-gray-100 p-0 shadow-none"
          >
            <SkipBack className="h-6 w-6" />
          </Button>
        </Link>

        {/* Play Button that redirects to playlist */}
        <Link href={playlistUrl} target="_blank" passHref>
          <Button
            aria-label="Play Playlist"
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
          >
            <Play className="h-6 w-6" />
          </Button>
        </Link>

        {/* Skip Next Button */}
        <Link href={playlistUrl} target="_blank" passHref>
          <Button
            aria-label="Skip Next"
            className="w-12 h-12 bg-transparent text-black hover:bg-gray-100 p-0 shadow-none"
          >
            <SkipForward className="h-6 w-6" />
          </Button>
        </Link>

        {/* Replay Button (Right) */}
        <Link href={playlistUrl} target="_blank" passHref>
          <Button
            aria-label="Replay Song"
            className="w-12 h-12 bg-transparent text-black hover:bg-gray-100 p-0 shadow-none"
          >
            <Repeat className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      {/* Static Time Bar (Seek Bar) */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          ariaLabel="Seek"
        />
        <div className="flex justify-between text-xs mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span> {/* Dummy total time */}
        </div>
      </div>

      {/* Music Visualizer (Bars Growing Symmetrically) */}
      <div className="absolute top-4 right-2 flex space-x-2" aria-hidden="true">
        {/* Bar 1 */}
        <div
          className="w-1 bg-primary rounded-full animate-grow1"
          style={{ height: "20px" }}
        ></div>

        {/* Bar 2 */}
        <div
          className="w-1 bg-primary rounded-full animate-grow2"
          style={{ height: "30px" }}
        ></div>

        {/* Bar 3 */}
        <div
          className="w-1 bg-primary rounded-full animate-grow3"
          style={{ height: "15px" }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes grow1 {
          0% { height: 20px; transform: translateY(0); }
          50% { height: 50px; transform: translateY(-15px); }
          100% { height: 20px; transform: translateY(0); }
        }
        @keyframes grow2 {
          0% { height: 30px; transform: translateY(0); }
          50% { height: 60px; transform: translateY(-15px); }
          100% { height: 30px; transform: translateY(0); }
        }
        @keyframes grow3 {
          0% { height: 15px; transform: translateY(0); }
          50% { height: 40px; transform: translateY(-12.5px); }
          100% { height: 15px; transform: translateY(0); }
        }

        .animate-grow1 {
          animation: grow1 1.5s ease-in-out infinite;
        }
        .animate-grow2 {
          animation: grow2 1.7s ease-in-out infinite;
        }
        .animate-grow3 {
          animation: grow3 1.9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
