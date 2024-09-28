import { connectDB } from "@/lib/mongodb";
import mongoose, { Schema, model, Document } from "mongoose";

export interface TrainingRequestDocument extends Document {
  _id: string;
  user_id: string; // Reference to the user who initiated the training
  request_id: string;
  trigger_word: string;
  status: "pending" | "completed" | "failed";
  started_at: Date;
  completed_at?: Date; // Nullable in case the training hasn't completed yet
  other_details: {
    [key: string]: any; // For any other dynamic parameters provided by the user
  };
  config_file?: {
    url: string;
    file_name: string;
    file_size: number;
    content_type: string;
  };
  diffusers_lora_file?: {
    url: string; // this is core url
    file_name: string;
    file_size: number;
    content_type: string;
  };
  createdAt: Date;
  updatedAt: Date;
  name: string; // Name of the training request
  cover_image_url?: string; // Optional URL for the cover image
  description?: string; // Optional description of the training request
}

const TrainingRequestSchema = new Schema<TrainingRequestDocument>(
  {
    user_id: {
      type: String,
      required: false,
      ref: "User",
    },
    request_id: {
      type: String,
      required: true,
    },
    trigger_word: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      required: true,
    },
    started_at: {
      type: Date,
      required: true,
    },
    completed_at: {
      type: Date,
    },
    other_details: {
      type: Schema.Types.Mixed,
      required: true,
    },
    config_file: {
      type: {
        url: String,
        file_name: String,
        file_size: Number,
        content_type: String,
      },
      required: false,
    },
    diffusers_lora_file: {
      type: {
        url: String,
        file_name: String,
        file_size: Number,
        content_type: String,
      },
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    cover_image_url: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

TrainingRequestSchema.index({ request_id: 1 }, { unique: false });

const TrainingRequest =
  mongoose.models?.TrainingRequest ||
  model<TrainingRequestDocument>("TrainingRequest", TrainingRequestSchema);

// Migration function
async function migrateUserIdToOptional() {
  await connectDB();
  const collection = TrainingRequest.collection;

  // Check if migration is needed
  const sampleDocument = await collection.findOne({
    user_id: { $exists: true },
  });
  if (!sampleDocument) {
    console.log("Migration not needed: user_id is already optional");
    return;
  }

  try {
    // Update all existing documents to ensure they have a user_id
    await collection.updateMany(
      { user_id: { $exists: false } },
      { $set: { user_id: null } }
    );

    console.log("Migration completed: user_id is now optional");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Run migration
migrateUserIdToOptional().catch(console.error);

export default TrainingRequest;
