"use client";
import { useState } from "react";
import ImageUploader from "@/components/custom/ImageUploader";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import JSZip from "jszip";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Progress } from "@/components/ui/progress";

export default function TrainModel() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [modelName, setModelName] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [triggerWord, setTriggerWord] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  const getZipPublicUrl = async () => {
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
    const file = new File([content], "test.zip", { type: "application/zip" });
    const response = await fetch("/api/get-presigned-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: "test.zip",
        fileType: "application/zip",
        fileSize: file.size,
      }),
    });
    const data = await response.json();
    const putResponse = await axios.put(data.presignedUrl, file, {
      headers: {
        "Content-Type": "application/zip",
      },
      onUploadProgress: (progressEvent) => {
        setProgress((progressEvent.progress ?? 0) * 100);
        console.log(progressEvent);
      },
    });
    if (putResponse.status === 200) {
      console.log("File uploaded successfully");
      return data.publicUrl;
    } else {
      console.error("File upload failed");
    }
  };

  const startModelTraining = async () => {
    if (isError()) {
      return;
    }
    const modelDesc =
      modelDescription.trim().length === 0
        ? `Generate high quality images of ${modelName}`
        : modelDescription;
    setIsGenerating(true);
    const zipPublicUrl = await getZipPublicUrl();
    if (!zipPublicUrl) {
      toast({
        title: "Error",
        description: "Failed to upload zip file",
        variant: "destructive",
      });
      return;
    }
    try {
      const response: any = await fetch("/api/provider/start-training", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images_data_url: zipPublicUrl,
          name: modelName,
          description: modelDesc,
          trigger_word: triggerWord,
          image_data: uploadedImages[0],
        }),
      });

      if (response.error) {
        console.error("Error during model training:", response.error);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Model training started:", data);
        toast({
          title: "Model training started",
          description:
            "Your model is being trained, this will take 3-5 minutes",
        });
        // Redirect to dashboard upon successful upload
        router.push("/dashboard");
      } else {
        console.error("Model training failed");
      }
    } catch (error) {
      console.error("Error during model training:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-6">Train a new model</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column: Current UI */}
        <div className="w-full md:w-1/2">
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
            <Button onClick={startModelTraining} disabled={isGenerating}>
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
          {isGenerating && progress < 100 && (
            <div className="mt-6">
              <Progress value={progress} />
              <p className="text-sm text-gray-500">{progress.toFixed(2)}%</p>
            </div>
          )}
        </div>

        {/* Right column: Tutorial */}
        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Optimize Your Model Training
          </h2>
          <p className="mb-4">
            Create a powerful and accurate AI model by following these
            guidelines for your training images:
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Ideal Images:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>High-resolution (at least 512x512 pixels)</li>
              <li>Clear, well-lit subjects</li>
              <li>Variety of poses and expressions</li>
              <li>Consistent style or theme</li>
              <li>Diverse backgrounds</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Images to Avoid:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Blurry or low-quality photos</li>
              <li>Group shots or images with multiple subjects</li>
              <li>Heavy filters or extreme editing</li>
              <li>Copyrighted or watermarked images</li>
              <li>Inappropriate or offensive content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
