import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploaderProps {
  onImagesUploaded: (images: string[]) => void;
  uploadedImages: string[];
}

export default function ImageUploader({
  onImagesUploaded,
  uploadedImages,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log("acceptedFiles", acceptedFiles);
      const readers = acceptedFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((results) => {
        onImagesUploaded([...uploadedImages, ...results]);
      });
    },
    [onImagesUploaded, uploadedImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [], "image/jpeg": [], "image/webp": [] },
  });

  return (
    <div className="mb-4">
      <div
        {...getRootProps()}
        className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#2F3B46] px-6 py-14 cursor-pointer relative"
      >
        <input {...getInputProps()} />
        <div className="">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 8L12 3L7 8"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 3V15"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex max-w-[480px] flex-col items-center gap-2">
          <p className="text-[#000000] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
            {isDragActive ? "Drop the images here" : "Drag & drop images here"}
          </p>
          <p className="text-[#000000] text-sm font-normal leading-normal max-w-[480px] text-center">
            Or click to select files from your computer
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {uploadedImages.map((img, index) => (
          <Card
            key={index}
            className="relative aspect-square overflow-hidden group"
          >
            <Image
              src={img}
              layout="fill"
              objectFit="cover"
              alt={`uploaded image ${index + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() =>
                onImagesUploaded(uploadedImages.filter((_, i) => i !== index))
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
