"use client";
import React, { useEffect, useState } from "react";

const YouTubeLatestVideo = () => {
  const API_KEY = "YOUR_API_KEY"; // Replace with your YouTube Data API key
  const CHANNEL_ID = "UCfTO7mV08O4l0iX1DCApZVA"; // ConnectYTH channel ID
  const [latestVideo, setLatestVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=1`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Check if there are any items returned
        if (data.items.length > 0) {
          setLatestVideo(data.items[0]);
        } else {
          setError("No videos found for this channel.");
        }
      } catch (error) {
        setError("Error fetching the latest video: " + error.message);
      }
    };

    fetchLatestVideo();
  }, [API_KEY]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      {latestVideo ? (
        <div className="bg-white border rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Latest Video: {latestVideo.snippet.title}
          </h3>
          <a
            href={`https://www.youtube.com/watch?v=${latestVideo.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Watch it here
          </a>
          <div className="mt-2">
            <img
              src={latestVideo.snippet.thumbnails.high.url}
              alt="Latest Video Thumbnail"
              className="rounded-lg"
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default YouTubeLatestVideo;
