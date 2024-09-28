"use client";
import Image from "next/image";
import React from "react";

import { HoverBorderGradient } from "./HoverBodyGradient";
import { useSession } from "next-auth/react";
import { Icons } from "@/components/Icons";

export const Hero = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center px-10 pb-10">
      <div className="relative w-24 h-24 mt-12">
        <Image src="/images/image.svg" width={96} height={96} alt="Logo" />
      </div>
      <h1 className="mt-4 font-bold text-white">ImageAI</h1>
      <p className="bg-gradient-to-b from-[#e8e8e8] to-[#a7a7a7] bg-clip-text text-center text-5xl font-semibold text-transparent py-2">
        Create Images with Your Ideas
      </p>
      <p className="max-w-2xl bg-gradient-to-b from-[#e8e8e8] to-[#a7a7a7] bg-clip-text text-center text-xl leading-8 text-transparent mt-2">
        With ImageAI, you can easily train AI to create images based on your
        personal photos, products, or even your pets. Let your imagination run
        wild!
      </p>
      <div>
        <HoverBorderGradient
          containerClassName="rounded-full mt-8"
          as="button"
          className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
          onClick={() => {
            window.location.href = session ? "/dashboard" : "/login";
          }}
        >
          <span className="font-semibold">Get Started</span>
        </HoverBorderGradient>
      </div>
    </div>
  );
};
