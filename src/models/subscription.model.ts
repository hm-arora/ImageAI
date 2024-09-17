import mongoose, { Schema, model } from "mongoose";

export interface SubscriptionDocument {
  userId: string;
  status: "active" | "cancelled" | "expires";
  renews_at: Date;
  customerId: string;
  variantId: string;
  subscriptionId: string;
  subscriptionPageUrl: string;
  other_details: Record<string, any>;
}

const SubscriptionSchema = new Schema<SubscriptionDocument>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expires"],
      required: [true, "Status is required"],
    },
    renews_at: {
      type: Date,
      required: [true, "Renewal date is required"],
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
    other_details: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.models?.Subscription || model<SubscriptionDocument>("Subscription", SubscriptionSchema);
export default Subscription;
