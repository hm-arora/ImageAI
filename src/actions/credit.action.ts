import { connectDB } from "@/lib/mongodb";
import Credit, { CreditDocument } from "../models/credit.model";

export async function hasEnoughCredit(
  userId: string,
  amount: number
): Promise<boolean> {
  await connectDB();
  const credit = await Credit.findOne({ userId });
  return credit ? credit.credits >= amount : false;
}

export async function addCredits(
  userId: string,
  amount: number,
  description: string
): Promise<CreditDocument> {
  await connectDB();
  const result = await Credit.findOneAndUpdate(
    { userId },
    {
      $inc: { credits: amount },
      $push: {
        transactions: {
          date: new Date(),
          amount,
          type: "add",
          description,
        },
      },
      $set: { lastUsageDate: new Date() },
    },
    { new: true, upsert: true }
  );
  if (!result) throw new Error("Failed to update credit");
  return result;
}

export async function deductCredits(
  userId: string,
  amount: number,
  description: string
): Promise<CreditDocument> {
  await connectDB();

  if (!(await hasEnoughCredit(userId, amount))) {
    throw new Error("Insufficient credits");
  }

  const result = await Credit.findOneAndUpdate(
    { userId },
    {
      $inc: { credits: -amount, totalUsage: amount },
      $push: {
        transactions: {
          date: new Date(),
          amount,
          type: "deduct",
          description,
        },
      },
      $set: { lastUsageDate: new Date() },
    },
    { new: true }
  );
  if (!result) throw new Error("Failed to update credit");
  return result;
}

export async function getCreditBalance(userId: string): Promise<number> {
  await connectDB();
  const credit = await Credit.findOne({ userId });
  return credit ? credit.credits : 0;
}
