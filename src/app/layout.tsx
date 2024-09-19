import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "./provider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en" className="dark">
        <body
          className={cn(
            "min-h-screen font-sans bg-white dark:bg-[#0E0F16] dark:text-[#f2f2f2]",
            inter.className
          )}
        >
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </Provider>
  );
}
