import { Metadata } from "next";
import TrainModel from "./TrainModel";

export const metadata: Metadata = {
  title: "Train a new model",
};

export default function Component() {
  return <TrainModel />;
}
