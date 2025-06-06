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

export async function POST(request) {
  try {
    const body = await request.json();
    const { author, dateTime, title, message } = body;

    const newTestimony = await TestimonyModel.create({
      author,
      post_datetime: dateTime,
      title,
      message,
    });

    return NextResponse.json(newTestimony, { status: 201 });
  } catch (error) {
    console.error("Error creating testimony:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "Missing testimony ID" },
        { status: 400 }
      );
    }

    const success = await TestimonyModel.delete(id);

    if (success) {
      return NextResponse.json({ message: "Testimony deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "Testimony not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting testimony:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
