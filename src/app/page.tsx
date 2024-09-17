"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <Button
          variant="outline"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </Button>
      );
    } else if (status === "loading") {
      return <span className="text-muted-foreground text-sm">Loading...</span>;
    } else {
      return (
        <Link href="/login">
          <Button>Sign In</Button>
        </Link>
      );
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Get started by signing in or exploring our features.
        </p>
        {showSession()}
      </main>
    </>
  );
}
