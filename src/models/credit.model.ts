import mongoose, { Schema, model } from "mongoose";

export interface CreditDocument {
  userId: string;
  credits: number;
  totalUsage: number;
  lastUsageDate: Date;
  transactions: {
    date: Date;
    amount: number;
    type: "add" | "deduct";
    description: string;
  }[];
}

const CreditSchema = new Schema<CreditDocument>(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
    },
    credits: {
      type: Number,
      default: 0,
    },
    totalUsage: {
      type: Number,
      default: 0,
    },
    lastUsageDate: {
      type: Date,
    },
    transactions: [
      {
        date: Date,
        amount: Number,
        type: {
          type: String,
          enum: ["add", "deduct"],
        },
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Credit =
  mongoose.models?.Credit || model<CreditDocument>("Credit", CreditSchema);
export default Credit;
