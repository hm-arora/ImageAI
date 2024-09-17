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
