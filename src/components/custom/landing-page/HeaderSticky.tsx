"use client";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

export const HeaderSticky = ({
  onPricingClick,
}: {
  onPricingClick: () => void;
}) => {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-30 flex items-center justify-center  md:pt-6 w-full backdrop-blur-sm">
      <div className="rounded-none md:rounded-full border border-zinc-800 bg-[#080808]/80 px-6 py-3 text-[#a7a7a7] backdrop-blur-lg w-full md:w-auto flex items-center justify-center">
        <div className="flex gap-6">
          <>
            <p className="cursor-pointer hover:text-white transition-all duration-300">
              Home
            </p>
            <p
              className="cursor-pointer hover:text-white transition-all duration-300"
              onClick={onPricingClick}
            >
              Pricing
            </p>
            <div
              className="flex items-center gap-2 border-l border-l-[#a7a7a7] pl-6 cursor-pointer hover:text-white transition-all duration-300"
              onClick={() => {
                window.location.href = session ? "/dashboard" : "/login";
              }}
            >
              <span>{session ? "Dashboard" : "Get Started"}</span>{" "}
              <ArrowRight className="size-5" />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
