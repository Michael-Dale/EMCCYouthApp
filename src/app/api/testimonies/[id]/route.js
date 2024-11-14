import TestimonyModel from "@/db/models/testimony";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Fetch the testimony by ID
    const testimony = await TestimonyModel.getById(id);

    if (!testimony) {
      return new Response("Testimony not found", { status: 404 });
    }

    return new Response(JSON.stringify(testimony), { status: 200 });
  } catch (error) {
    console.error("Error fetching testimony:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
