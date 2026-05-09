import { PredictionForm } from "@/components/predict/prediction-form";
import { FeatureImportance } from "@/components/predict/feature-importance";
import { PredictPageHeader } from "@/components/predict/page-header";

export default function PredictPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div>
        <PredictPageHeader />
        <PredictionForm />
      </div>
      <div className="max-w-5xl mx-auto">
        <FeatureImportance />
      </div>
    </div>
  );
}
