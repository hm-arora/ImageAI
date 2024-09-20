import mongoose, { Schema, model } from "mongoose";

export interface SubscriptionDocument {
  userId: string;
  status: string;
  customerId: string;
  variantId: string;
  subscriptionId: string;
  subscriptionPageUrl: string;
  otherDetails: Record<string, any>;
}

const SubscriptionSchema = new Schema<SubscriptionDocument>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    customerId: {
      type: String,
      required: [true, "Customer ID is required"],
    },
    variantId: {
      type: String,
      required: [true, "Variant ID is required"],
    },
    subscriptionId: {
      type: String,
      required: [true, "Subscription ID is required"],
    },
    subscriptionPageUrl: {
      type: String,
      required: [true, "Subscription page URL is required"],
    },
    otherDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Subscription =
  mongoose.models?.Subscription ||
  model<SubscriptionDocument>("Subscription", SubscriptionSchema);
export default Subscription;
