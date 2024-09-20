import { connectDB } from "@/lib/mongodb";
import Subscription from "@/models/subscription.model";
import { revalidatePath } from "next/cache";
import { addCredits } from "./credit.action";
import { CreditType } from "@/lib/constants";

export async function handleOrderCreatedAction(data: any) {
  await connectDB();

  console.log(data);

  const {
    data: {
      id: subscriptionId,
      attributes: {
        urls,
        status,
        first_order_item: { variant_id },
        customer_id,
      },
    },
    meta: {
      custom_data: { userID: userId },
    },
  } = data;

  try {
    const subscription = new Subscription({
      userId,
      status,
      customerId: customer_id,
      variantId: variant_id,
      subscriptionId,
      subscriptionPageUrl: urls.receipt,
      other_details: data,
    });

    await subscription.save();

    var creditsToAdd = 0;
    if (Number(variant_id) === Number(process.env.VARIANT_ID_1)) {
      // Snapper plan
      creditsToAdd = 100;
    } else if (Number(variant_id) === Number(process.env.VARIANT_ID_2)) {
      // Creator plan
      creditsToAdd = 500;
    } else if (Number(variant_id) === Number(process.env.VARIANT_ID_3)) {
      // Visioniory plan
      creditsToAdd = 1000;
    }
    if (creditsToAdd > 0) {
      await addCredits(userId, creditsToAdd, CreditType.SUBSCRIPTION);
    }

    // Revalidate the user's dashboard or profile page
    revalidatePath("/dashboard");
    console.log("Subscription created:", subscription);

    return { success: true, subscription };
  } catch (error) {
    console.error("Error creating subscription:", error);
    return { error: "Failed to create subscription" };
  }
}
