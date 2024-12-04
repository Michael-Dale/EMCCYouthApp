import { NextResponse } from "next/server";
import DevotionModel from "@/db/models/devotion";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    ///api/devotions?id=2  then id=2
    const id = searchParams.get("id");
    //If call '/api/devotions?latest=true' then latest=true
    const latest = searchParams.get("latest");

    if (latest === "true") {
      const latestDevotion = await DevotionModel.getLatest();
      return NextResponse.json(latestDevotion);
    }

    if (id) {
      const devotion = await DevotionModel.getById(id);
      return NextResponse.json(devotion);
    }

    const devotions = await DevotionModel.getAll();
    return NextResponse.json(devotions);
  } catch (error) {
    console.error("Error fetching devotions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Ensure that devotion_datetime is in the right format (ISO string)
    if (data.devotion_datetime) {
      data.devotion_datetime = new Date(data.devotion_datetime).toISOString();
    }
    
    const newDevotion = await DevotionModel.create(data);
    return NextResponse.json(newDevotion, { status: 201 });
  } catch (error) {
    console.error("Error creating devotion:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const data = await request.json();
    const updatedDevotion = await DevotionModel.update(id, data);
    return NextResponse.json(updatedDevotion);
  } catch (error) {
    console.error("Error updating devotion:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await DevotionModel.delete(id);

    // Return 204 No Content without a body
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting devotion:", error);

    // Return a proper 500 error response
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

