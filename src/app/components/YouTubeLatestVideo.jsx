// "use client";
// import React, { useEffect, useState } from "react";
// import YouTubeEmbed from "../components/YoutTubeCard";

// // In-memory cache to store the video and timestamp
// let latestVideoCache = null;
// let lastFetchedDate = null;

// const YouTubeLatestVideo = () => {
//   const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
//   const CHANNEL_ID = process.env.NEXT_PUBLIC_YT_CHANNEL_ID;

//   const [latestVideo, setLatestVideo] = useState(null);
//   const [error, setError] = useState(null);

//   // Function to check if the fetch is needed based on the last fetched date
//   const isFetchNeeded = () => {
//     const currentDate = new Date();

//     // If there's no last fetched date or it's a different day, fetch is needed
//     if (
//       !lastFetchedDate ||
//       lastFetchedDate.getDate() !== currentDate.getDate() ||
//       lastFetchedDate.getMonth() !== currentDate.getMonth() ||
//       lastFetchedDate.getFullYear() !== currentDate.getFullYear()
//     ) {
//       return true;
//     }
//     return false;
//   };

//   useEffect(() => {
//     const fetchLatestVideo = async () => {
//       // Check if we already have cached data and if the fetch is not needed
//       if (latestVideoCache && !isFetchNeeded()) {
//         setLatestVideo(latestVideoCache); // Use the cached video
//         return;
//       }

//       // Otherwise, fetch new video data from the YouTube API
//       const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=1`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(
//             `HTTP error! Status: ${response.status} - ${data.error.message}`
//           );
//         }

//         if (data.items.length > 0) {
//           const video = data.items[0];
//           setLatestVideo(video);

//           // Update the in-memory cache
//           latestVideoCache = video;
//           lastFetchedDate = new Date(); // Store the current fetch time
//         } else {
//           setError("No videos found for this channel.");
//         }
//       } catch (error) {
//         setError("Error fetching the latest video: " + error.message);
//       }
//     };

//     fetchLatestVideo();
//   }, [API_KEY, CHANNEL_ID]);

//   if (error) {
//     return <YouTubeEmbed />;
//   }

//   return (
//     <div className="flex justify-center ">
//       {latestVideo ? (
//         <YouTubeEmbed
//           title={latestVideo.snippet.title}
//           link={`https://www.youtube.com/watch?v=${latestVideo.id.videoId}`}
//           thumbnail={latestVideo.snippet.thumbnails.high.url}
//         />
//       ) : null}
//       {/* {latestVideo ? (
//         // Wrap the entire component in an anchor tag to make it clickable
//         <a
//           href={`https://www.youtube.com/watch?v=${latestVideo.id.videoId}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block max-w-max bg-white border rounded-lg shadow-lg p-4 text-center"
//         >
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">
//             Latest Video: {latestVideo.snippet.title}
//           </h3>
//           <div className="flex justify-center items-center mt-2">
//             <img
//               src={latestVideo.snippet.thumbnails.high.url}
//               alt="Latest Video Thumbnail"
//               className="rounded-lg"
//             />
//           </div>
//         </a>
//       ) : (
//         <div>Loading...</div>
//       )} */}
//     </div>
//   );
// };

// export default YouTubeLatestVideo;
// "use client";
import React, { useEffect, useState } from "react";
import YouTubeEmbed from "../components/YoutTubeCard";

const YouTubeLatestVideo = () => {
  const [latestVideo, setLatestVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoFromDatabase = async () => {
      try {
        const response = await fetch("/api/youtube-db");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error fetching video from database.");
        }

        setLatestVideo(data);
      } catch (error) {
        setError("Error fetching the latest video: " + error.message);
      }
    };

    fetchVideoFromDatabase();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center">
      {latestVideo ? (
        <YouTubeEmbed
          title={latestVideo.title}
          link={latestVideo.video_link}
          thumbnail={latestVideo.thumbnail_url}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default YouTubeLatestVideo;

