"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { register } from "@/actions/register.action";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react"; // Add this import

// Add this constant to control Email & Password flow
const ENABLE_EMAIL_PASSWORD = false;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      if (activeTab === "signin") {
        const res = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirect: false,
        });
        if (res?.error) {
          toast({
            title: "Error",
            description: res.error,
            variant: "destructive",
          });
        } else if (res?.ok) {
          router.push("/dashboard");
        }
      } else {
        const r = await register({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          name: formData.get("name") as string,
        });
        if (r?.error) {
          toast({
            title: "Error",
            description: r.error,
            variant: "destructive",
          });
        } else {
          router.push("/dashboard");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const GoogleButton = ({ action }: { action: string }) => (
    <Button
      variant="outline"
      className="w-full mb-4"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <svg
        className="mr-2 h-4 w-4"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      {action} with Google
    </Button>
  );

  const AuthForm = ({ type }: { type: "signin" | "register" }) => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "register" && (
        <div>
          <Label htmlFor="register-name">Full Name</Label>
          <Input id="register-name" name="name" type="text" required />
        </div>
      )}
      <div>
        <Label htmlFor={`${type}-email`}>Email</Label>
        <Input id={`${type}-email`} name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor={`${type}-password`}>Password</Label>
        <Input
          id={`${type}-password`}
          name="password"
          type="password"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        {type === "signin" ? "Sign In" : "Register"}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        By {type === "signin" ? "signing in" : "registering"}, you accept our{" "}
        <a href="#" className="underline">
          Terms and Conditions
        </a>
      </p>
    </form>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="w-full max-w-md p-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Authentication
            </CardTitle>
            <CardDescription className="text-center">
              Sign in or create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ENABLE_EMAIL_PASSWORD ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="signin" className="space-y-4">
                  <GoogleButton action="Sign In" />
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </div>
                  <AuthForm type="signin" />
                </TabsContent>
                <TabsContent value="register" className="space-y-4">
                  <GoogleButton action="Register" />
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or register with email
                      </span>
                    </div>
                  </div>
                  <AuthForm type="register" />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-4">
                <GoogleButton action="Continue" />
              </div>
            )}
          </CardContent>
          <CardFooter>{/* Error handling is now done via toast */}</CardFooter>
        </Card>
      </div>
    </div>
  );
}
