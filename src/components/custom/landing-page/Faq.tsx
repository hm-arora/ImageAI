"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const questions = [
  `What happens if I reach my monthly limit of AI models or images?`,
  `Can I use the AI-generated images for commercial purposes?`,
  `Do unused models or images roll over to the next month?`,
  `What type of images work best for AI model training?`,
  `Are there any images I should avoid using for training my AI model?`,
];

const answers = [
  `Once you reach your limit, you won't be able to create new models or generate more images until the next billing cycle. However, you can upgrade to a higher plan at any time.`,
  `Yes! All our plans, including Snapper, Creator, and Visionary, include full commercial use, allowing you to use the images for personal or business projects.`,
  `No, unused AI models or image generation credits do not roll over. Your monthly allowance resets at the beginning of each billing cycle.`,
  `Ideal images should have clear, well-lit subjects, a variety of poses and expressions, and a consistent style or theme. Diverse backgrounds also help improve the quality of the AI model.`,
  `Yes, avoid using blurry or low-quality photos, group shots, heavily filtered or edited images, copyrighted or watermarked content, and inappropriate or offensive images.`,
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
      className={cn("px-8 py-6 rounded-lg mt-5 bg-[#1C1B1B] flex flex-col", {
        "shadow-md": isOpen,
        "shadow-sm": !isOpen,
      })}
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
    <div className="flex max-w-2xl flex-col items-stretch justify-center pb-10">
      <h2 className="text-center text-3xl font-semibold text-white">
        Frequently Asked Questions
      </h2>
      {questions.map((question, idx) => {
        return (
          <Accordian key={idx} question={question} answer={answers[idx]!} />
        );
      })}
    </div>
  );
};
