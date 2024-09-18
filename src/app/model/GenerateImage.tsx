"use client";
import { useState, useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageGenerationResponse } from "@/types/types";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/types";
import { cn } from "@/lib/utils";

type ModelPageProps = {
  params: { id: string };
};

export default function GenerateImage({ params }: ModelPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageGen, setImageGen] = useState<ImageGenerationResponse | null>(
    null
  );
  const [modelData, setModelData] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const id = params.id;
  const [imageLoaded, setImageLoaded] = useState(false); // TODO: use this to show download button

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await fetch(`/api/model/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch model data");
        }
        const data = await response.json();
        setModelData(data);
      } catch (error) {
        console.error("Error fetching model data:", error);
        toast({
          title: "Error fetching model data",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
      } finally {
        console.log("=============================");
        setIsLoading(false);
      }
    };

    fetchModelData();
  }, [id]);

  const generateImage = async () => {
    if (!prompt || prompt.trim() === "") {
      toast({
        title: "Error generating image",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    setImageGen(null);
    try {
      const response = await fetch(`/api/generate-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, training_id: id }),
      });
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }
      const data: ImageGenerationResponse = await response.json();
      setImageGen(data);
    } catch (error) {
      toast({
        title: "Error generating image",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (modelData?.status === "pending") {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <span className="ml-2">This model is still training</span>
        <span className="ml-2">Please check back later</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 space-y-4">
          <div className="space-y-4">
            <label htmlFor="prompt" className="text-lg font-semibold">
              Prompt
            </label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              className="h-32 bg-dashboard-background/40 border-gray-700 resize-none text-xl font-semibold min-h-[200px]"
              onChange={(e) => {
                const value = e.target.value;
                setPrompt(value);
              }}
              onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.metaKey && e.key === "Enter") {
                  generateImage();
                }
              }}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              className="text-black/80"
              onClick={() => setPrompt("")}
            >
              Reset
            </Button>
            <Button onClick={generateImage} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Result</h2>
          </div>
          <div className="aspect-square bg-black/5 rounded-md flex items-center justify-center">
            {imageGen && imageGen.images && imageGen.images.length > 0 ? (
              <div className="relative">
                <img
                  src={imageGen.images[0].url}
                  alt="Generated image"
                  className="w-full rounded-lg"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={cn("w-16 h-16 bg-black/10 rounded-lg", {
                      "animate-bounce": isGenerating,
                    })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
