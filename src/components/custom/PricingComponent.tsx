"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PRICING_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import { Session } from "next-auth";

const PricingComponent = ({ session }: { session: Session | null }) => {
  const generateCheckoutUrl = (baseUrl: string) => {
    if (!session || !session?.user) {
      return "/dashboard";
    }
    const email = session?.user?.email;
    const userId = session?.user?.id;
    return `${baseUrl}?checkout[email]=${email}&checkout[custom][userID]=${userId}`;
  };

  return (
    <div className="mb-8 mt-24 text-center">
      <div className="mx-auto mb-10 sm:max-w-lg">
        <h1 className="text-6xl sm:text-7xl font-bold text-white">Pricing</h1>
        <p className="mt-4 text-gray-400 sm:text-lg">
          Whether you&apos;re just trying our service or need more, we&apos;ve
          got you covered
        </p>
      </div>
      <div className="flex gap-10 flex-wrap items-center justify-center">
        <TooltipProvider>
          {PRICING_ITEMS.map((item) => {
            return (
              <div
                key={item.plan}
                className={cn("relative rounded-2xl bg-zinc-900 shadow-lg", {
                  "border-2 border-blue-600 shadow-blue-900":
                    item.slug == "creator",
                  "border border-zinc-800": item.slug != "creator",
                })}
              >
                {item.plan === "creator" && (
                  <div className="absolute -top-5 left-0 right-0 m-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
                    Upgrade now
                  </div>
                )}

                <div className="p-5">
                  <h3 className="my-3 text-center font-display font-bold text-3xl text-white">
                    {item.plan}
                  </h3>
                  <p className="text-gray-400">{item.tagline}</p>
                  <div className="my-5 flex flex-col items-center">
                    {item.price.cutAmount && (
                      <span className="text-gray-400 line-through text-2xl ml-2">
                        ${item.price.cutAmount}
                      </span>
                    )}
                    <p className="font-display text-6xl font-semibold text-white">
                      ${item.price.amount}
                      {/* add mo */}
                      <span className="text-gray-400  text-base ml-2">
                        /month
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-400">per month</p>
                </div>

                <ul className="my-10 space-y-5 px-8">
                  {item.features.map(({ text, footnote, negative }) => (
                    <li key={text} className="flex space-x-6">
                      <div className="flex-shrink-0">
                        {negative ? (
                          <Minus className="h-6 w-6 text-gray-500" />
                        ) : (
                          <Check className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                      {footnote ? (
                        <div className="flex items-center space-x-1">
                          <p
                            className={cn("text-gray-300", {
                              "text-gray-500": negative,
                            })}
                          >
                            {text}
                          </p>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-zinc-500" />
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-2 bg-zinc-800 text-white">
                              {footnote}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      ) : (
                        <p
                          className={cn("text-gray-300", {
                            "text-gray-500": negative,
                          })}
                        >
                          {text}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-zinc-800" />
                <div className="p-5">
                  <div
                    className={buttonVariants({
                      className:
                        "w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",
                    })}
                    onClick={() => {
                      window.open(
                        generateCheckoutUrl(item.checkoutUrl),
                        "_blank"
                      );
                    }}
                  >
                    Get started
                    <ArrowRight className="h-5 w-5 ml-1.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PricingComponent;
