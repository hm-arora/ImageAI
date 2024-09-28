import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TrainingRequest from "@/models/training_request.model";
import {
  ErrorResponse,
  GetAllModelsResponse,
  TrainingModel,
} from "@/types/types";

export async function GET(): Promise<
  NextResponse<GetAllModelsResponse | ErrorResponse>
> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const trainingModels = await TrainingRequest.find({
      $or: [
        { user_id: session.user.id },
        { user_id: { $in: [undefined] } }
      ]
    });

    const simplifiedTrainingModels: TrainingModel[] = trainingModels.map(
      (model) => ({
        id: model._id.toString(),
        name: model.name,
        description: model.description,
        coverImageUrl: model.cover_image_url,
        triggerWord: model.trigger_word,
        status: model.status,
        createdAt: model.createdAt,
      })
    );

    return NextResponse.json({ models: simplifiedTrainingModels });
  } catch (error) {
    console.error("Error fetching user models:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
