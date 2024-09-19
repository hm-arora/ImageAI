"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollXProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollXProgress, [0, 1], [0, -400]);
  const translateSecond = useTransform(scrollXProgress, [0, 1], [0, 400]);
  const translateThird = useTransform(scrollXProgress, [0, 1], [0, -800]);

  const third = Math.ceil(images.length / 3);

  const firstPart = [
    ...images.slice(0, third),
    ...images.slice(images.length - third),
  ];
  const secondPart = [
    ...images.slice(third, 2 * third),
    ...images.slice(0, third),
  ];
  const thirdPart = [...images.slice(2 * third), ...images.slice(0, third)];

  // Automatic scrolling effect with looping
  useEffect(() => {
    const interval = setInterval(() => {
      if (gridRef.current) {
        if (
          gridRef.current.scrollLeft >=
          gridRef.current.scrollWidth - gridRef.current.clientWidth
        ) {
          gridRef.current.scrollLeft = 0;
        } else {
          gridRef.current.scrollLeft += 1;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("w-full overflow-x-auto", className)} ref={gridRef}>
      <div className="flex items-start max-w-none gap-10 py-10 px-40 flex-col">
        <motion.div
          className="flex flex-row gap-4 md:gap-10"
          style={{ x: translateFirst }}
        >
          {firstPart.map((el, idx) => (
            <Image
              key={"grid-1" + idx}
              src={el}
              className="h-40 w-40 md:h-80 md:w-80 object-cover object-left-top rounded-lg !m-0 !p-0"
              height="400"
              width="400"
              alt="thumbnail"
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row gap-4 md:gap-10"
          style={{ x: translateSecond }}
        >
          {secondPart.map((el, idx) => (
            <Image
              key={"grid-2" + idx}
              src={el}
              className="h-40 w-40 md:h-80 md:w-80 object-cover object-left-top rounded-lg !m-0 !p-0"
              height="400"
              width="400"
              alt="thumbnail"
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row gap-4 md:gap-10"
          style={{ x: translateThird }}
        >
          {thirdPart.map((el, idx) => (
            <Image
              key={"grid-3" + idx}
              src={el}
              className="h-40 w-40 md:h-80 md:w-80 object-cover object-left-top rounded-lg !m-0 !p-0"
              height="400"
              width="400"
              alt="thumbnail"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
