"use client";
import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { HeaderSticky } from "./HeaderSticky";
import { Hero } from "./Hero";
import { FAQ } from "./Faq";
import Footer from "./Footer";
import PricingComponent from "../PricingComponent";
import { ParallaxScrollDemo } from "./ParallexScrollDemo";
import VideoDemo from "./VideoDemo";

export function LandingPage() {
  const { data: session } = useSession();
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    window.scrollTo({
      top: pricingRef.current?.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="transition-bg relative flex h-full flex-col items-center justify-center bg-zinc-50  font-satoshi text-slate-950 dark:bg-[#121212]">
      <div className="flex size-full flex-col items-center">
        <HeaderSticky onPricingClick={scrollToPricing} />
        <Hero />
        <ParallaxScrollDemo />
        <VideoDemo />

        <div ref={pricingRef} id="pricing">
          <PricingComponent session={session} />
        </div>
        <div className="p-10">
          <FAQ />
        </div>
        <Footer onPricingClick={scrollToPricing} />
      </div>
    </div>
  );
}
