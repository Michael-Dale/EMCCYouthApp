// import { NextResponse } from "next/server";
// import YoutubeModel from "../../../db/models/YoutubeModel";  // Import the model

// export async function GET() {
//   try {
//     const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
//     const CHANNEL_ID = process.env.NEXT_PUBLIC_YT_CHANNEL_ID;

//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=1`
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(`YouTube API error: ${data.error.message}`);
//     }

//     const video = data.items[0]; // Fetch the first (latest) video
//     console.log("Fetched video data:", video);

//     // Insert video data into the database
//     const { title, thumbnails, videoId } = video.snippet;
//     const thumbnail_url = thumbnails.high.url;
//     const video_link = `https://www.youtube.com/watch?v=${videoId}`;

//     await YoutubeModel.create({
//       title,
//       thumbnail_url,
//       video_link,
//     });

//     // Return the inserted video data as the JSON response
//     return NextResponse.json(video);
//   } catch (error) {
//     console.error("Error fetching YouTube data:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// export async function GET() {
//     try {
//       // Fetch the latest video from the database
//       const latestVideo = await YoutubeModel.getLatest();  // Using the model you created
  
//       if (!latestVideo) {
//         throw new Error("No video found in the database.");
//       }
  
//       // Return the video data as JSON
//       return NextResponse.json(latestVideo);
//     } catch (error) {
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     }
//   }

import { NextResponse } from "next/server";
import YoutubeModel from "../../../db/models/YoutubeModel";  // Import the model
const dayjs = require('dayjs')

export async function GET() {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
    const CHANNEL_ID = process.env.NEXT_PUBLIC_YT_CHANNEL_ID;

    // Fetch the latest video from the channel using the YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet,id&type=video&maxResults=1`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`YouTube API error: ${data.error.message}`);
    }

    const video = data.items[0]; // Fetch the first (latest) video
    console.log("Fetched video data:", video);

    // Extract video details from the response
    const { title, thumbnails } = video.snippet;
    const videoId = video.id.videoId;  // Extract videoId from the 'id' object
    const thumbnail_url = thumbnails.high.url;
    const video_link = `https://www.youtube.com/watch?v=${videoId}`;
    const video_date=video.snippet.publishedAt;

    // console.log("Video date: ",video_date , "Formated: ", dayjs(video_date).format('DD/MM/YYYY'));

    // Save the fetched video data to the database
    await YoutubeModel.create({
      title,
      thumbnail_url,
      video_link,
      video_date,
    });

    // Return the inserted video data as the JSON response
    return NextResponse.json({
      title,
      thumbnail_url,
      video_link,
      video_date
    });
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

