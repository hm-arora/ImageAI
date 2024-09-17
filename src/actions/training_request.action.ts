"use server";
import { connectDB } from "@/lib/mongodb";
import TrainingRequest from "@/models/training_request.model";

export const createTrainingRequest = async (values: any) => {
  const {
    user_id,
    request_id,
    trigger_word,
    status,
    started_at,
    completed_at,
    cover_image_url,
    other_details,
    name,
    description,
  } = values;

  try {
    await connectDB();
    const trainingRequestData = {
      user_id,
      request_id,
      trigger_word,
      status,
      started_at,
      completed_at,
      other_details,
      cover_image_url,
      name,
      description,
    };

    const trainingRequest = new TrainingRequest(trainingRequestData);
    const savedTrainingRequest = await trainingRequest.save();
    return { success: true, trainingRequest: savedTrainingRequest };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred while creating the training request." };
  }
};

export const updateTrainingRequest = async (
  request_id: string,
  updates: any
) => {
  try {
    await connectDB();
    console.log("===================================");
    console.log(request_id, updates);
    const updatedTrainingRequest = await TrainingRequest.findOneAndUpdate(
      { request_id },
      updates,
      { new: true }
    );

    if (!updatedTrainingRequest) {
      return { error: "Training request not found." };
    }

    return { success: true, trainingRequest: updatedTrainingRequest };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred while updating the training request." };
  }
};

export const getTrainingRequestByRequestId = async (request_id: string) => {
  try {
    await connectDB();
    const trainingRequest = await TrainingRequest.findOne({ request_id });
    return { success: true, trainingRequest };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred while fetching the training request." };
  }
};

export const getTrainingRequest = async (_id: string) => {
  try {
    await connectDB();
    const trainingRequest = await TrainingRequest.findById(_id);

    if (!trainingRequest) {
      return { error: "Training request not found." };
    }

    return { success: true, trainingRequest };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred while fetching the training request." };
  }
};
