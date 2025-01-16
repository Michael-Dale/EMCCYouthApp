import { NextResponse } from "next/server";
import EventModel from "@/db/models/event";


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const upcoming = searchParams.get("upcoming");

    if (upcoming === "true") {
      const upcomingEvents = await EventModel.getUpcoming();
      return NextResponse.json(upcomingEvents);
    }

    if (id) {
      const event = await EventModel.getById(id);
      return NextResponse.json(event);
    }

    const events = await EventModel.getAll();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
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
    const location = formData.get("location");
    const date = formData.get("date");
    const image = formData.get("image"); // This might be a file blob

    // Validate fields
    if (!title || !location || !date) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Handle image upload (if necessary)
    let imageUrl = null;
    if (image && image.name) {
      // Example: Upload the file to a storage solution (e.g., AWS S3, Cloudinary)
      imageUrl = `/uploads/${image.name}`; // Replace with actual upload logic
    }

    // Create the event
    const newEvent = await EventModel.create({
      title,
      location,
      event_datetime: date,
      image_url: imageUrl,
    });

    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
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
    const updatedEvent = await EventModel.update(id, body);
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");  // Use searchParams for query params

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Ensure the event exists before deleting
    const event = await EventModel.getById(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Delete the event
    await EventModel.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
