import { Metadata } from "next";
import GenerateImage from "../GenerateImage";

export const metadata: Metadata = {
  title: "Image generation",
};

export default function ModelPage({ params }: { params: { id: string } }) {
  return <GenerateImage params={params} />;
}
