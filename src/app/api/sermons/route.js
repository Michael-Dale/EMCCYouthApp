import { NextResponse } from "next/server";
import SermonModel from "@/db/models/sermon";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const latest = searchParams.get("latest");

    if (latest === "true") {
      const latestSermon = await SermonModel.getLatest();
      return NextResponse.json(latestSermon);
    }

    if (id) {
      const sermon = await SermonModel.getById(id);
      return NextResponse.json(sermon);
    }

    const sermons = await SermonModel.getAll();
    return NextResponse.json(sermons);
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
