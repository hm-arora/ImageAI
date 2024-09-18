"use server";
import { connectDB } from "@/lib/mongodb";
import ImageGeneration from "@/models/image-generation.model";

export const createImageGen = async (values: any) => {
  const { user_id, training_request_id, image_generation } = values;

  try {
    await connectDB();
    const imageGenData = {
      user_id,
      training_request_id,
      ...image_generation,
    };

    const imageGen = new ImageGeneration(imageGenData);
    const savedImageGen = await imageGen.save();
    return { success: true, imageGen: savedImageGen };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred during registration." };
  }
};
