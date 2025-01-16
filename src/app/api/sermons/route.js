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

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type");

    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title");
    const pdf = formData.get("pdf");
    const image = formData.get("image");
console.log(pdf);
    // Validate fields
    if (!title || !pdf || !image) {
      return NextResponse.json(
        { error: "Title, PDF, and Image are required." },
        { status: 400 }
      );
    }

    // Extract local file paths (assuming files are already on the server)
    //Where upload to S3 will take place
    const pdfUrl = `/uploads/sermons/${pdf.name}`;   // Local file path as URL
    const imageUrl = `/uploads/sermons/${image.name}`; // Local file path as URL

    // Save URLs to PostgreSQL
    const newSermon = await SermonModel.create({
      title,
      sermon_pdf_url: pdfUrl,
      sermon_image_url: imageUrl,
    });

    return NextResponse.json(newSermon);
  } catch (error) {
    console.error("Error creating sermon:", error);
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

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const sermon = await SermonModel.getById(id);
    if (!sermon) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }

    await SermonModel.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting sermon:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
