"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  return (
    <div className="sm:hidden">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-zinc-700"
      />
      {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-10 w-full">
          <ul className="absolute bg-dashboard-background border-b border-white/4 shadow-xl grid w-full gap-3 py-20 pb-8">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/train", label: "Create Model" },
            ].map((link) => (
              <li key={link.href} className="py-2">
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-white"
                      : "text-white/60 hover:text-white/80"
                  } transition-colors duration-200 font-semibold"`}
                >
                  <div className="px-4">{link.label}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
