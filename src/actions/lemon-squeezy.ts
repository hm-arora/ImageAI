import { connectDB } from "@/lib/mongodb";
import Subscription from "@/models/subscription.model";
import { revalidatePath } from "next/cache";

export async function handleSubscriptionCreatedAction(data: any) {
  await connectDB();

  console.log(data);

  const {
    data: {
      id: subscriptionId,
      attributes: { urls, status, renews_at, variant_id, customer_id },
    },
    meta: {
      custom_data: { userID: userId },
    },
  } = data;

  try {
    const subscription = new Subscription({
      userId,
      status,
      renews_at: new Date(renews_at),
      customerId: customer_id,
      variantId: variant_id,
      subscriptionId,
      subscriptionPageUrl: urls.customer_portal,
      other_details: data,
    });

    await subscription.save();
    console.log("Subscription created:", subscription);

    // Revalidate the user's dashboard or profile page
    revalidatePath("/dashboard");

    return { success: true, subscription };
  } catch (error) {
    console.error("Error creating subscription:", error);
    return { error: "Failed to create subscription" };
  }
}

export async function getSubscriptionByUserId(userId: string) {
  await connectDB();

  const subscription = await Subscription.findOne({ userId });
  return subscription;
}

export async function handleSubscriptionUpdatedAction(data: any) {
  await connectDB();

  console.log(data);

  const {
    data: {
      id: subscriptionId,
      attributes: { urls, status, renews_at, variant_id, customer_id },
    },
    meta: {
      custom_data: { userID: userId },
    },
  } = data;

  try {
    const subscription = await Subscription.findOne({ subscriptionId });

    if (!subscription) {
      console.error("Subscription not found:", subscriptionId);
      return { error: "Subscription not found" };
    }

    subscription.status = status;
    subscription.renews_at = new Date(renews_at);
    subscription.customerId = customer_id;
    subscription.variantId = variant_id;
    subscription.subscriptionPageUrl = urls.customer_portal;
    subscription.other_details = data;

    await subscription.save();
    console.log("Subscription updated:", subscription);

    // Revalidate the user's dashboard or profile page
    revalidatePath("/dashboard");

    return { success: true, subscription };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return { error: "Failed to update subscription" };
  }
}