"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const questions = [
  `Do I have a time limit to use my purchased AI models or images?`,
  `Can I use the AI-generated images for commercial purposes?`,
  `What type of images work best for AI model training?`,
  `Are there any images I should avoid using for training my AI model?`,
  `How fast can I train my custom AI model?`,
  `How many images do I need to get started?`,
];

const answers = [
  `No, there's no time limit. Once you've purchased a pack, you can use your AI models or generate your images whenever you want. Your credits don't expire.`,
  `Yes! All our plans, including Snapper, Creator, and Visionary, include full commercial use, allowing you to use the images for personal or business projects.`,
  `Ideal images should have clear, well-lit subjects, a variety of poses and expressions, and a consistent style or theme. Diverse backgrounds also help improve the quality of the AI model.`,
  `Yes, avoid using blurry or low-quality photos, group shots, heavily filtered or edited images, copyrighted or watermarked content, and inappropriate or offensive images.`,
  `Lightning quick! In just 3-5 minutes, your custom AI model will be ready. After that, generating unique images takes less than 10 seconds!`,
  `Just 4 stunning images, and your custom AI model is good to go!`,
];

const Accordian = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "px-8 py-6 rounded-lg mt-5 bg-zinc-900 flex flex-col border border-zinc-800",
        {
          "shadow-md": isOpen,
          "shadow-sm": !isOpen,
        }
      )}
    >
      <button
        className="cursor-pointer text-start font-semibold text-white"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {question}
      </button>
      <div
        className={cn({
          "max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-out":
            !isOpen,
          "max-h-40 opacity-100 transition-all duration-300 ease-in": isOpen,
        })}
      >
        <p className=" pt-5 text-[#e8e8e8]">{answer}</p>
      </div>
    </div>
  );
};
export const FAQ = () => {
  return (
    <div className="flex max-w-2xl flex-col items-stretch justify-center pb-10 mt-12">
      <h2 className="bg-gradient-to-b from-[#e8e8e8] to-[#a7a7a7] bg-clip-text text-center text-6xl sm:text-7xl font-semibold text-transparent py-2 mb-10">
        FAQ
      </h2>
      {questions.map((question, idx) => {
        return (
          <Accordian key={idx} question={question} answer={answers[idx]!} />
        );
      })}
    </div>
  );
};
