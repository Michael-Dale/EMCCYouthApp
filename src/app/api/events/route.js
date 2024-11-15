import { NextResponse } from "next/server";
import EventModel from "@/db/models/event";

// // Get all events
// GET /api/events

// // Get upcoming events
// GET /api/events?upcoming=true

// // Get specific event
// GET /api/events?id=1

// // Create new event
// POST /api/events
// Body: {
//   "image_url": "...",
//   "title": "...",
//   "location": "...",
//   "event_datetime": "2024-11-20T18:00:00"
// }

// // Update event
// PUT /api/events?id=1
// Body: {
//   "image_url": "...",
//   "title": "...",
//   "location": "...",
//   "event_datetime": "2024-11-20T18:00:00"
// }

// // Delete event
// DELETE /api/events?id=1

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
    const body = await request.json();
    const newEvent = await EventModel.create(body);
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await EventModel.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
