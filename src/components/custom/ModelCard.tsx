import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { TrainingModel } from "@/types/types";

const ModelCard = ({ model }: { model: TrainingModel }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    if (model.status === "pending") {
      const startTime = new Date(model.createdAt).getTime();
      console.log("Start Time:", startTime);

      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - startTime;
        const newElapsedTime = Math.floor(timeDifference / 100);

        if (newElapsedTime >= 3000) {
          // 3000 tenths of a second = 5 minutes
          clearInterval(interval);
          setShowTimer(false); // Hide the timer
        } else {
          setElapsedTime(newElapsedTime);
        }

        console.log("Elapsed Time:", newElapsedTime);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [model.status, model.createdAt]);

  const formatTime = (tenths: number) => {
    const seconds = Math.floor(tenths / 10);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const tenthsOfSecond = tenths % 10;
    return minutes > 0
      ? `${minutes}m ${remainingSeconds}s ${tenthsOfSecond}`
      : `${remainingSeconds}s ${tenthsOfSecond}`;
  };

  return (
    <Link href={model.status === "pending" ? `#` : `/model/${model.id}`}>
      <Card className="relative overflow-hidden h-[300px]">
        <Image
          src={model.coverImageUrl}
          alt={model.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-0 right-0 p-4"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
          <div>
            <h3 className="font-bold text-lg mb-1 text-white">{model.name}</h3>
            <p className="text-sm text-white/80">{model.description ?? ""}</p>
          </div>
          {model.status === "pending" && (
            <div className="flex items-center gap-2 flex-col">
              {showTimer && (
                <p className="text-white">{formatTime(elapsedTime)}</p>
              )}
              <Badge>Pending</Badge>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ModelCard;
