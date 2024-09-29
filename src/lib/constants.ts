import { PricingItem } from "@/types/types";

export const PRICING_ITEMS: PricingItem[] = [
  {
    plan: "Snapper",
    slug: "snapper",
    tagline: "Kickstart your creativity with Snapper",
    features: [
      {
        text: "100 credits",
      },
      {
        text: "1 AI Model",
      },
      {
        text: "Create 30 Images",
      },
      {
        text: "Use Forever - No monthly limits",
      },
      {
        text: "Full commercial use",
      },
    ],
    price: {
      amount: 9.9,
      cutAmount: 19.9,
    },
    checkoutUrl: process.env.NEXT_PUBLIC_PRODUCT_ID_1_URL as string,
  },
  {
    plan: "Creator",
    slug: "creator",
    tagline: "Unleash your imagination with Creator",
    features: [
      {
        text: "500 credits",
      },
      {
        text: "5 AI Models",
      },
      {
        text: "Create 200 Images",
      },
      {
        text: "Use Forever - No monthly limits",
      },
      {
        text: "Full commercial use",
      },
    ],
    price: {
      amount: 39.9,
      cutAmount: 49.9,
    },
    checkoutUrl: process.env.NEXT_PUBLIC_PRODUCT_ID_2_URL as string,
  },
  {
    plan: "Visionary",
    slug: "visionary",
    tagline: "Unleash Visionary creativity",
    features: [
      {
        text: "1000 credits",
      },
      {
        text: "10 AI Models",
      },
      {
        text: "Create 1000 images",
      },
      {
        text: "Use Forever - No monthly limits",
      },
      {
        text: "Full commercial use",
      },
    ],
    price: {
      amount: 79.9,
      cutAmount: 99.9,
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

export const GITHUB_URL = "https://github.com/hm-arora/imageai";
