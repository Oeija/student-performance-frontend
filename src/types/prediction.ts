export interface PredictionRequest {
  gender: "male" | "female";
  race_ethnicity: string;
  parental_level_of_education: string;
  lunch: "free/reduced" | "standard";
  test_preparation_course: "none" | "completed";
  reading_score: number;
  writing_score: number;
}

export interface PredictionResponse {
  prediction: number;
  status: "success";
}

export interface ApiError {
  detail: string;
}

export interface FeatureImportanceItem {
  feature: string;
  mean_abs_shap: number;
}

export interface ModelInfoResponse {
  model_type: string;
  r2_score: number;
  cv_folds: number;
  feature_importance: FeatureImportanceItem[];
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
}
