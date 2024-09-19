"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { GetServerSideProps } from "next";
import ModelCard from "@/components/custom/ModelCard";
import { GetAllModelsResponse } from "@/types/types";
import { NavbarWrapper } from "@/components/NavbarWrapper";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch("/api/get-all-models");
    const data: GetAllModelsResponse = await response.json();
    return { props: { initialData: data } };
  } catch (error) {
    console.error("Failed to fetch training models:", error);
    return { props: { initialData: null } };
  }
};
export default function Dashboard({
  initialData,
}: {
  initialData: GetAllModelsResponse | null;
}) {
  const [trainingModel, setTrainingModel] = useState<
    GetAllModelsResponse | undefined
  >(initialData ?? undefined);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      const fetchTrainingModels = async () => {
        try {
          const response = await fetch("/api/get-all-models");
          const data: GetAllModelsResponse = await response.json();
          setTrainingModel(data);
        } catch (error) {
          console.error("Failed to fetch training models:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTrainingModels();
    }
  }, [initialData]);

  const SkeletonCard = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/2 mb-2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );

  return (
    <NavbarWrapper>
      <div>
        <div className="p-8  h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Models</h2>
            <Link href="/train">
              <Button>Create Model</Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid w-full flex-1 grid-cols-1 gap-6 pb-4 md:grid-cols-2 md:px-2 lg:grid-cols-5">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
            </div>
          ) : (trainingModel?.models?.length ?? 0) === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="text-xl mb-4">No models available</p>
              <Link href="/train">
                <Button className="">Create a new model</Button>
              </Link>
            </div>
          ) : (
            <div className="grid w-full flex-1 grid-cols-1 gap-6 pb-4 md:grid-cols-2 md:px-2 lg:grid-cols-6">
              {trainingModel?.models.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          )}
        </div>
      </div>
    </NavbarWrapper>
  );
}
