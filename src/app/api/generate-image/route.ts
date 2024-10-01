import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTrainingRequest } from "@/actions/training_request.action";
import { createImageGen } from "@/actions/image-generation.action";
import { deductCredits, getCreditBalance } from "@/actions/credit.action";

// MOCK:// Image generation
const SHOULD_MOCK = false;
export const maxDuration = 60;

const MOCK_RESPONSE = {
  images: [
    {
      url: "https://fal.media/files/elephant/_u0wDV34hFyP34ue5Fa-z_2505859785a941fd83d7429e3b89555b.jpg",
      width: 1024,
      height: 768,
      content_type: "image/jpeg",
    },
  ],
  timings: {
    inference: 3.3018459849990904,
  },
  seed: 13408904435836668000,
  has_nsfw_concepts: [false],
  prompt: "test",
};

export async function POST(request: NextRequest) {
  try {
    const session = await validateSession();
    const { prompt, training_id } = await validateRequestBody(request);
    await validateCredits(session.user!.id);
    const loraUrl = await getLoraUrl(session.user!.id, training_id);
    const requestBody = createRequestBody(prompt, loraUrl);
    const fluxResponse = await sendFluxApiRequest(requestBody);

    // Call createImageGen with the response data
    const imageGenResult = await createImageGen({
      user_id: session.user!.id,
      training_request_id: training_id,
      image_generation: fluxResponse,
    });

    if (imageGenResult.error) {
      throw new Error(imageGenResult.error);
    }

    await deductCredits(
      session.user!.id,
      Number(process.env.PER_IMAGE_GEN_CREDIT),
      `Image generated for training request ${training_id}`
    );

    return NextResponse.json(fluxResponse);
  } catch (error) {
    return handleError(error);
  }
}

async function validateSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

async function validateRequestBody(request: NextRequest) {
  const { prompt, training_id } = await request.json();
  if (!prompt || !training_id) {
    throw new Error("Missing Params");
  }
  return { prompt, training_id };
}

async function validateCredits(user_id: string) {
  const credits = await getCreditBalance(user_id);
  if (credits < Number(process.env.PER_IMAGE_GEN_CREDIT)) {
    throw new Error("Insufficient credits");
  }
}

async function getLoraUrl(user_id: string, training_id: string) {
  const result = await getTrainingRequest(user_id, training_id);
  if (result.error || !result.trainingRequest) {
    throw new Error("Training request not found");
  }
  const loraUrl = result.trainingRequest.diffusers_lora_file?.url;
  if (!loraUrl) {
    throw new Error("Something went wrong");
  }
  return loraUrl;
}

function createRequestBody(prompt: string, loraUrl: string) {
  return {
    prompt: prompt,
    model_name: null,
    loras: [
      {
        path: loraUrl,
        scale: 1,
      },
    ],
    embeddings: [],
  };
}

async function sendFluxApiRequest(requestBody: any) {
  if (SHOULD_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    return MOCK_RESPONSE;
  }

  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    throw new Error("FAL_KEY not found in environment variables");
  }

  const response = await fetch("https://fal.run/fal-ai/flux-lora", {
    method: "POST",
    headers: {
      Authorization: `Key ${falKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

function handleError(error: unknown) {
  console.error("Error:", error);
  const errorMessage =
    error instanceof Error
      ? error.message
      : "An error occurred while processing your request";
  const statusCode =
    error instanceof Error && error.message === "Unauthorized" ? 401 : 500;
  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}
