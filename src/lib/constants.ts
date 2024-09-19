import { PricingItem } from "@/types/types";

export const PRICING_ITEMS: PricingItem[] = [
  {
    plan: "Snapper",
    slug: "snapper",
    tagline: "Kickstart your creativity with Snapper",
    features: [
      {
        text: "Create 1 AI model per month",
      },
      {
        text: "Create 100 images per month",
      },
      {
        text: "Full commercial use",
      },
    ],
    price: {
      amount: 10,
      cutAmount: 18,
      priceIds: {
        test: "snapper_test_id",
        production: "snapper_prod_id",
      },
    },
    checkoutUrl: "",
  },
  {
    plan: "Creator",
    slug: "creator",
    tagline: "Unleash your imagination with Creator",
    features: [
      {
        text: "Create 5 AI models per month",
      },
      {
        text: "Create 600 images per month",
      },
      {
        text: "Full commercial use",
      },
    ],
    price: {
      amount: 39,
      cutAmount: 49,
      priceIds: {
        test: "creator_test_id",
        production: "creator_prod_id",
      },
    },
    checkoutUrl: "",
  },
  {
    plan: "Visionary",
    slug: "visionary",
    tagline: "Push the boundaries of creation with Visionary",
    features: [
      {
        text: "Create 10 AI models per month",
      },
      {
        text: "Create 1000 images per month",
      },
      {
        text: "Full commercial use",
      },
    ],
    price: {
      amount: 79,
      cutAmount: 99,
      priceIds: {
        test: "visionary_test_id",
        production: "visionary_prod_id",
      },
    },
    checkoutUrl: "",
  },
];
