import { Metadata } from "next";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Component() {
  const initialData = null;

  return <Dashboard initialData={initialData} />;
}
