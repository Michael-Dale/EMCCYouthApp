import { NextResponse } from "next/server";
import ImageCarouselModel from "@/db/models/imageCarousel";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const image = await ImageCarouselModel.getById(id);
      return NextResponse.json(image);
    }

    const images = await ImageCarouselModel.getAll();
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching carousel images:", error);
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
    const image = formData.get("image"); // This might be a file blob

    if (!image || !image.name) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    // Handle image upload (if necessary)
    const imageUrl = `/uploads/${image.name}`; // Replace with actual upload logic

    const newImage = await ImageCarouselModel.create({ image_url: imageUrl });

    return NextResponse.json(newImage);
  } catch (error) {
    console.error("Error adding carousel image:", error);
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
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const updatedImage = await ImageCarouselModel.update(id, body);
    return NextResponse.json(updatedImage);
  } catch (error) {
    console.error("Error updating carousel image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Ensure the image exists before deleting
    const image = await ImageCarouselModel.getById(id);
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete the image
    await ImageCarouselModel.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting carousel image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
