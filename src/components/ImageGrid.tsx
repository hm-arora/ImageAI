import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Image {
  url: string;
  width: number;
  height: number;
  content_type: string;
  _id: string;
}

interface ImageGeneration {
  timings: { inference: number };
  _id: string;
  user_id: string;
  training_request_id: string;
  prompt: string;
  images: Image[];
  seed: number;
  has_nsfw_concepts: boolean[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ImageGridProps {
  imageGenerations: ImageGeneration[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ imageGenerations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const openDialog = (prompt: string) => {
    setSelectedPrompt(prompt);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedPrompt("");
  };

  return (
    <div className="px-12">
      <h1 className="text-2xl font-bold mb-4">Past Generations</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {imageGenerations.map((gen) =>
          gen.images.map((img) => (
            <div key={img._id} className="relative rounded-lg">
              <img
                src={img.url}
                alt={gen.prompt}
                className="w-full h-auto cursor-pointer rounded-lg"
                onClick={() => openDialog(gen.prompt)}
              />
            </div>
          ))
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Prompt</DialogTitle>
          <DialogDescription>{selectedPrompt}</DialogDescription>
          <Button onClick={closeDialog} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGrid;
