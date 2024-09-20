import { PricingItem } from "@/types/types";

export const PRICING_ITEMS: PricingItem[] = [
  {
    plan: "Snapper",
    slug: "snapper",
    tagline: "Kickstart your creativity with Snapper",
    features: [
      {
        text: "Create 1 AI model",
      },
      {
        text: "Create 100 images",
      },
      {
        text: "Full commercial use",
      },
    ],
    price: {
      amount: 10,
      cutAmount: 18,
    },
    checkoutUrl: process.env.NEXT_PUBLIC_PRODUCT_ID_1_URL as string,
  },
  {
    plan: "Creator",
    slug: "creator",
    tagline: "Unleash your imagination with Creator",
    features: [
      {
        text: "Create 5 AI models",
      },
      {
        text: "Create 600 images",
      },
      {
        text: "Full commercial use",
      },
    ],
    price: {
      amount: 39,
      cutAmount: 49,
    },
    checkoutUrl: process.env.NEXT_PUBLIC_PRODUCT_ID_2_URL as string,
  },
  {
    plan: "Visionary",
    slug: "visionary",
    tagline: "Push the boundaries of creation with Visionary",
    features: [
      {
        text: "Create 10 AI models",
      },
      {
        text: "Create 1000 images",
      },
      {
        text: "Full commercial use",
      },
    ],
    price: {
      amount: 79,
      cutAmount: 99,
    },
    checkoutUrl: process.env.NEXT_PUBLIC_PRODUCT_ID_3_URL as string,
  },
];

export enum CreditType {
  USER_REGISTRATION = "USER_REGISTRATION",
  IMAGE_GENERATION = "IMAGE_GENERATION",
  MODEL_TRAINING = "MODEL_TRAINING",
  SUBSCRIPTION = "SUBSCRIPTION",
}
