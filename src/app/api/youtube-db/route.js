import { NextResponse } from "next/server";
import YoutubeModel from "../../../db/models/YoutubeModel";  // Import the model

export async function GET() {
  try {
    // Fetch the latest video from the database
    const latestVideo = await YoutubeModel.getLatest();

    if (!latestVideo) {
      return NextResponse.json({ error: "No videos found in the database" }, { status: 404 });
    }

    // Return the latest video from the database as JSON
    return NextResponse.json(latestVideo);
  } catch (error) {
    console.error("Error fetching video from database:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
