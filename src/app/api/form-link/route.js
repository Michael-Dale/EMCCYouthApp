import { NextResponse } from "next/server";
import FormLinkModel from "@/db/models/GoogleLink";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const latest = searchParams.get("latest");

    if (latest === "true") {
      const latestFormLink = await FormLinkModel.getLatest();
      return NextResponse.json(latestFormLink);
    }

    if (id) {
      const formLink = await FormLinkModel.getById(id);
      return NextResponse.json(formLink);
    }

    const formLinks = await FormLinkModel.getAll();
    return NextResponse.json(formLinks);
  } catch (error) {
    console.error("Error fetching form links:", error);
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
      const description = formData.get("description");
      const formLink = formData.get("form_link");
      const formImage = formData.get("form_image");
  
      // Validate fields
      if (!title || !description || !formLink) {
        return NextResponse.json(
          { error: "All fields (title, description, form_link) are required." },
          { status: 400 }
        );
      }
  
      // Handle image (use a placeholder if not provided)
      const formImageUrl = formImage
        ? `/uploads/forms/${formImage.name}`
        : "/placeholders/default_image.png";
  
      // Save to PostgreSQL
      const newFormLink = await FormLinkModel.create({
        title,
        description,
        form_link: formLink,
        form_image_url: formImageUrl,
      });
  
      return NextResponse.json(newFormLink);
    } catch (error) {
      console.error("Error creating form link:", error);
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
        console.error("ID is required but not provided.");
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }
  
      console.log(`Attempting to fetch form link with ID: ${id}`);
      const formLink = await FormLinkModel.getById(id);
  
      if (!formLink) {
        console.error(`Form link with ID: ${id} not found.`);
        return NextResponse.json({ error: "Form link not found" }, { status: 404 });
      }
  
      console.log(`Form link found: ${JSON.stringify(formLink)}`);
      console.log(`Attempting to delete form link with ID: ${id}`);
      await FormLinkModel.delete(id);
      console.log(`Form link with ID: ${id} successfully deleted.`);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error deleting form link:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  
