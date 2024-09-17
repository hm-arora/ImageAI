"use client";
import { useState } from "react";
import ImageUploader from "@/components/custom/ImageUploader";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [modelName, setModelName] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const [triggerWord, setTriggerWord] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleReset = () => {
    setUploadedImages([]);
    setModelName("");
    setModelDescription("");
    setTriggerWord("");
  };

  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-6">Train a new model</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          <div className="mb-6">
            <label
              htmlFor="modelName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Model Name
            </label>
            <Input
              id="modelName"
              type="text"
              placeholder="Enter model name"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="modelDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Model Description
            </label>
            <Input
              id="modelDescription"
              type="text"
              placeholder="Enter model description"
              value={modelDescription}
              onChange={(e) => setModelDescription(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="triggerWord"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Trigger Word
            </label>
            <Input
              id="triggerWord"
              type="text"
              placeholder="Enter trigger word"
              value={triggerWord}
              onChange={(e) => setTriggerWord(e.target.value)}
              required
            />
          </div>
          <ImageUploader
            onImagesUploaded={setUploadedImages}
            uploadedImages={uploadedImages}
          />
          <div className="mt-6 flex gap-4 flex-row-reverse">
            <Button>
              {isGenerating ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Train Model"
              )}
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
