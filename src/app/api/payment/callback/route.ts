import { NextResponse } from "next/server";
import crypto from "crypto";
import {
  handleSubscriptionCreatedAction,
  handleSubscriptionUpdatedAction,
} from "@/actions/lemon-squeezy";

const LEMONSQUEEZY_SIGNATURE_HEADER = "x-signature";
const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get(LEMONSQUEEZY_SIGNATURE_HEADER);

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET || "");
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  const checksum = Buffer.from(signature, "utf8");

  if (!crypto.timingSafeEqual(digest, checksum)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  // Handle different event types
  switch (event.meta.event_name) {
    case "subscription_created":
      await handleSubscriptionCreated(event);
      break;
    case "subscription_updated":
      await handleSubscriptionUpdated(event);
      break;
    default:
      console.log(`Unhandled event type: ${event.meta.event_name}`);
  }

  return NextResponse.json({ success: true });
}

async function handleSubscriptionCreated(data: any) {
  const result = await handleSubscriptionCreatedAction(data);
  if (result.error) {
    console.error("Error creating subscription:", result.error);
  } else {
    console.log("Subscription created successfully:", result.subscription);
  }
}

async function handleSubscriptionUpdated(data: any) {
  const result = await handleSubscriptionUpdatedAction(data);
  if (result.error) {
    console.error("Error updating subscription:", result.error);
  } else {
    console.log("Subscription updated successfully:", result.subscription);
  }
}
