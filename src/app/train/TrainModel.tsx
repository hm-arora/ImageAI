"use client";
import { useState } from "react";
import ImageUploader from "@/components/custom/ImageUploader";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import JSZip from "jszip";

export default function Dashboard() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [modelName, setModelName] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const [triggerWord, setTriggerWord] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [zipPublicUrl, setZipPublicUrl] = useState<string | null>(null);

  const handleReset = () => {
    setUploadedImages([]);
    setModelName("");
    setModelDescription("");
    setTriggerWord("");
  };

  const isError = () => {
    if (!modelName || modelName.trim().length === 0) {
      toast({
        title: "Error",
        description: "Please enter a model name",
        variant: "destructive",
      });
      return true;
    }
    if (uploadedImages.length === 0) {
      toast({
        title: "Error",
        description: "Please upload images",
        variant: "destructive",
      });
      return true;
    }
    if (uploadedImages.length < 4) {
      toast({
        title: "Error",
        description: "Please upload at least 4 images",
        variant: "destructive",
      });
      return true;
    }
    if (!triggerWord || triggerWord.trim().length === 0) {
      toast({
        title: "Error",
        description: "Please enter a trigger word",
        variant: "destructive",
      });
      return true;
    }
    return false;
  };

  const handleUpload = async () => {
    setIsGenerating(true);
    setZipPublicUrl(null); // Reset the URL when starting a new upload
    console.log("Creating zip file...");
    const zip = new JSZip();

    // Add each image to the zip file
    uploadedImages.forEach((img, index) => {
      const base64Data = img.split(",")[1];
      const binaryData = Uint8Array.from(atob(base64Data), (c) =>
        c.charCodeAt(0)
      );
      zip.file(`image_${index + 1}.png`, binaryData, { base64: true });
    });

    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });

    console.log("content", content);
    // Create FormData and append the zip file
    const formData = new FormData();
    formData.append("file", content, "uploaded_images.zip");

    try {
      const response = await fetch("/api/data-upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Zip file uploaded successfully");
        setZipPublicUrl(data.publicUrl);
      } else {
        console.error("Failed to upload zip file");
        // Handle the error, maybe show an error message to the user
      }
    } catch (error) {
      console.error("Error uploading zip file:", error);
      // Handle the error, maybe show an error message to the user
    } finally {
      setIsGenerating(false);
    }
  };

  const generateModel = async () => {
    // if (isError()) return;
    setIsGenerating(true);
    await handleUpload();
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
          <p>{zipPublicUrl}</p>
          <div className="mt-6 flex gap-4 flex-row-reverse">
            <Button onClick={generateModel} disabled={isGenerating}>
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
