import { LandingPage } from "@/components/custom/landing-page/Landing";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "ImageAI",
  description: "Train and generate custom AI images with your own data",
});

export default function Home() {
  return <LandingPage />;
}
