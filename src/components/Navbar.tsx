"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserButton from "./UserButton";
import { useSession } from "next-auth/react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session || !session.user) return null;

  return (
    <div className="p-4 flex items-center justify-between bg-dashboard-background border-b border-white/4">
      <div className="flex items-center space-x-8">
        <Link href="/dashboard" className="text-xl font-bold z-40">
          ImageAI
        </Link>
        <nav className="hidden sm:block">
          <ul className="flex space-x-6">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/train", label: "Create Model" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-white"
                      : "text-white/60 hover:text-white/80"
                  } transition-colors duration-200 font-semibold"`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <MobileNav />
        <UserButton session={session} />
      </div>
    </div>
  );
};

export default Navbar;
