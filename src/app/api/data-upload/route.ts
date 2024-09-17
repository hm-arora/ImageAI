import { NextRequest, NextResponse } from "next/server";
import { getPublicFileUrl, uploadFileToBucket } from "@/lib/files";
import { createUUID } from "@/lib/uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filename = `uploads/${createUUID()}-${file.name}`;

    try {
      const result = await uploadFileToBucket(file, filename);
      const publicUrl = await getPublicFileUrl(filename);
      console.log(`File uploaded to R2: ${filename}`);
      console.log(`Public URL: ${publicUrl}`);
      return NextResponse.json(
        { message: "File uploaded successfully", key: filename, publicUrl },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error uploading file to R2:", error);
      return NextResponse.json(
        { error: "Error uploading file to R2" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Error processing upload" },
      { status: 500 }
    );
  }
}
