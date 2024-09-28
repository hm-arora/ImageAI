import { NextRequest, NextResponse } from "next/server";
import { getTrainingRequest } from "@/actions/training_request.action";

export async function GET(
  request: NextRequest,
  { params }: { params: { training_request_id: string } }
) {
  const training_id = params.training_request_id;

  try {
    const result = await getTrainingRequest(training_id);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    if (!result.success || !result.trainingRequest) {
      return NextResponse.json(
        { error: "Training request not found" },
        { status: 404 }
      );
    }

    // Simplify the model request
    const simplifiedRequest = {
      id: result.trainingRequest._id,
      status: result.trainingRequest.status,
      started_at: result.trainingRequest.started_at,
      triggerWord: result.trainingRequest.trigger_word,
      completedAt: result.trainingRequest.completed_at,
      otherDetails: result.trainingRequest.other_details,
    };

    return NextResponse.json(simplifiedRequest);
  } catch (error) {
    console.error("Error fetching training request:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the training request" },
      { status: 500 }
    );
  }
}
