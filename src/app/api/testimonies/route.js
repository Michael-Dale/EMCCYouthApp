import { NextResponse } from "next/server";
import TestimonyModel from "@/db/models/testimony";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const latest = searchParams.get("latest");

    // If "latest" parameter is true, fetch the latest testimony
    if (latest === "true") {
      const latestTestimony = await TestimonyModel.getLatest();
      return NextResponse.json(latestTestimony);
    }

    // If "id" is provided, fetch the testimony by its ID
    if (id) {
      const testimony = await TestimonyModel.getById(id);
      return NextResponse.json(testimony);
    }

    // If no parameters are provided, fetch all testimonies
    const testimonies = await TestimonyModel.getAll();
    return NextResponse.json(testimonies);
  } catch (error) {
    console.error("Error fetching testimonies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
