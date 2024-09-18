import { NextRequest, NextResponse } from "next/server";
import { getPresignedPutUrl, getPublicFileUrl } from "@/lib/files";
import { createUUID } from "@/lib/uuid";

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType, fileSize } = await req.json();

    if (!fileName || !fileType || !fileSize) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filename = `uploads/${createUUID()}-${fileName}`;

    const presignedUrl = await getPresignedPutUrl(filename, fileType);
    const publicUrl = await getPublicFileUrl(filename);

    return NextResponse.json({ presignedUrl, publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Error processing upload" },
      { status: 500 }
    );
  }
}
