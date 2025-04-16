import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { createTrainingRequest } from "@/actions/training_request.action";
import { createUUID } from "@/lib/uuid";
import { getPublicFileUrl, uploadFileToBucket } from "@/lib/files";
import { deductCredits, getCreditBalance } from "@/actions/credit.action";

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
  const { images_data_url, cover_image_url, trigger_word } = body;
  if (!images_data_url) {
    throw new Error("Images are required");
  }
  return { images_data_url, cover_image_url, trigger_word };
}

async function validateCredits(user_id: string) {
  const credits = await getCreditBalance(user_id);
  if (credits < Number(process.env.PER_MODEL_TRAIN_CREDIT)) {
    throw new Error("Insufficient credits");
  }
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
    const { images_data_url, cover_image_url, trigger_word } = validateRequest(body);
    await validateCredits(user.id);
    const data = await processRequest(images_data_url, trigger_word);

    if (data.status === "IN_QUEUE") {
      const request_id = data.request_id;
      const user_id = user.id;

      // Create a DB entry for the training request
      await createTrainingRequest({
        user_id,
        request_id,
        trigger_word,
        status: "pending",
        started_at: new Date(),
        other_details: {
          images_data_url,
        },
        name: body.name,
        cover_image_url,
        description: body.description,
      });

      await deductCredits(
        user.id,
        Number(process.env.PER_MODEL_TRAIN_CREDIT),
        `Model trained for request ${request_id}`
      );
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
