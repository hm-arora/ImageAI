import mongoose, { Schema, model, Document } from "mongoose";

export interface ImageGenerationDocument extends Document {
  _id: string;
  user_id: string;
  training_request_id: string;
  images: {
    url: string;
    width: number;
    height: number;
    content_type: string;
  }[];
  timings: {
    inference: number;
  };
  seed: number;
  prompt: string;
  has_nsfw_concepts: boolean[];
  createdAt: Date;
  updatedAt: Date;
}

const ImageGenerationSchema = new Schema<ImageGenerationDocument>(
  {
    user_id: {
      type: String,
      required: true,
      ref: "User",
      index: true,
    },
    training_request_id: {
      type: String,
      required: true,
      ref: "TrainingRequest",
    },
    prompt: {
      type: String,
      required: true,
    },
    images: [
      {
        url: String,
        width: Number,
        height: Number,
        content_type: String,
      },
    ],
    timings: {
      inference: Number,
    },
    seed: {
      type: Number,
      required: true,
    },
    has_nsfw_concepts: [Boolean],
  },
  {
    timestamps: true,
  }
);

const ImageGeneration =
  mongoose.models?.ImageGeneration ||
  model<ImageGenerationDocument>("ImageGeneration", ImageGenerationSchema);
export default ImageGeneration;
