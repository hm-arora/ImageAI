import { getSubscriptionByUserId } from "@/actions/lemon-squeezy";
import PricingComponent from "./PricingComponent";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Pricing = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("User not logged in");
  }
  const subscription = await getSubscriptionByUserId(session.user.id);
  return <PricingComponent isPro={subscription?.status === "active"} />;
};

export default Pricing;
