export interface TrainingModel {
  id: string;
  name: string;
  status: string;
  triggerWord: string;
  coverImageUrl: string;
  description: string;
  createdAt: Date;
}

export interface GetAllModelsResponse {
  models: TrainingModel[];
}

export interface ErrorResponse {
  error: string;
}

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  content_type: string;
}

export interface ImageGenerationResponse {
  images: GeneratedImage[];
  timings: {
    inference: number;
  };
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
}
