"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import UserButton from "@/components/UserButton";

export function Navbar() {
  const { status } = useSession();

  return (
    <nav className="border-b">
      <div className="container flex py-4 items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            {status === "unauthenticated" && (
              <p>Sign in to see the dashboard</p>
            )}
            {status === "authenticated" && (
              <div className="flex items-center gap-4">
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Authenticated Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/pricing">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </div>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        {status === "authenticated" && <UserButton />}
      </div>
    </nav>
  );
}
