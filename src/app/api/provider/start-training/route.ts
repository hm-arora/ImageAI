import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { createUUID } from "@/lib/uuid";
import { getPublicFileUrl, uploadFileToBucket } from "@/lib/files";

// MOCK:// Image train model upload
const SHOULD_MOCK = false;

const MOCK_RESPONSE = {
  status: "IN_QUEUE",
  request_id: "123",
  response_url:
    "https://queue.fal.run/fal-ai/flux-lora-fast-training/requests/123",
  status_url:
    "https://queue.fal.run/fal-ai/flux-lora-fast-training/requests/123/status",
  cancel_url:
    "https://queue.fal.run/fal-ai/flux-lora-fast-training/requests/123/cancel",
  logs: null,
  metrics: {},
  queue_position: 0,
};

async function validateSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("You must be signed in to access this endpoint.");
  }
  return session.user;
}

function validateRequest(body: any) {
  const { images_data_url, image_data, trigger_word } = body;
  if (!images_data_url) {
    throw new Error("Images are required");
  }
  return { images_data_url, image_data, trigger_word };
}

async function getUploadCoverImage(image_data: string) {
  const base64Image = image_data;
  const filename = `uploads/${createUUID()}-cover.png`;
  // Remove the data:image/xxx;base64, part if present
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

  // Create a buffer from the base64 string
  const buffer = Buffer.from(base64Data, "base64");

  // Create a File object from the buffer
  const file = new File([buffer], filename, { type: "image/png" });
  // Upload the file to the bucket
  const result = await uploadFileToBucket(file, filename);
  const publicUrl = await getPublicFileUrl(filename);
  return publicUrl;
}

async function processRequest(images_data_url: string, trigger_word: string) {
  if (SHOULD_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    return MOCK_RESPONSE;
  }

  const webhook_url = process.env.FAL_WEBHOOK_URL as string;
  const response = await fetch(
    `https://queue.fal.run/fal-ai/flux-lora-fast-training/?fal_webhook=${encodeURIComponent(
      webhook_url
    )}`,
    {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images_data_url, trigger_word }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function POST(request: Request) {
  try {
    const user = await validateSession();
    const body = await request.json();
    const { images_data_url, image_data, trigger_word } = validateRequest(body);
    // const cover_image_url = await getUploadCoverImage(image_data);
    const data = await processRequest(images_data_url, trigger_word);

    if (data.status === "IN_QUEUE") {
      console.log("===================================");
      console.log("Model training request created");
      console.log("===================================");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status:
          error instanceof Error && error.message.includes("signed in")
            ? 401
            : 500,
      }
    );
  }
}
