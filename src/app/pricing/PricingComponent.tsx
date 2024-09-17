"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    description: "Perfect for individuals",
    features: ["1 user", "10GB storage", "Basic support"],
    checkoutUrl: process.env.NEXT_PUBLIC_PRODUCT_ID_1_URL as string,
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "Ideal for small teams",
    features: [
      "5 users",
      "50GB storage",
      "Priority support",
      "Advanced analytics",
    ],
    checkoutUrl: process.env.NEXT_PUBLIC_PRODUCT_ID_2_URL as string,
  },
  {
    name: "Enterprise",
    price: "$49.99",
    description: "For large organizations",
    features: [
      "Unlimited users",
      "500GB storage",
      "24/7 support",
      "Custom integrations",
      "Dedicated account manager",
    ],
    checkoutUrl: process.env.NEXT_PUBLIC_PRODUCT_ID_3_URL as string,
  },
];

interface PricingProps {
  isPro: boolean;
}
const Pricing: React.FC<PricingProps> = ({ isPro }) => {
  const { data: session } = useSession();
  if (!session) {
    return <div>Loading...</div>;
  }
  const generateCheckoutUrl = (baseUrl: string) => {
    const email = "test@test.com";
    const userId = session?.user?.id;
    return `${baseUrl}?checkout[email]=${email}&checkout[custom][userID]=${userId}`;
  };

  return (
    <div className="container mx-auto py-12">
      <div>{isPro ? "Pro" : "Basic"}</div>
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          return (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold mb-4">
                  {plan.price}
                  <span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  className="w-full"
                  onClick={() => {
                    window.open(
                      generateCheckoutUrl(plan.checkoutUrl),
                      "_blank"
                    );
                  }}
                >
                  Choose Plan
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
