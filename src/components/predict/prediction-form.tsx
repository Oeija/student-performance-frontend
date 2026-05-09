"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, User, Briefcase, BookOpen, Sparkles } from "lucide-react";
import * as v from "valibot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { predict } from "@/lib/api";
import { predictionSchema } from "@/lib/validations";
import { PredictionRequest } from "@/types/prediction";
import { ResultCard } from "./result-card";
import { ErrorDisplay } from "./error-display";

function SectionHeading({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="rounded-md bg-primary/10 p-1.5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
    </div>
  );
}

type FieldErrors = Partial<Record<keyof PredictionRequest, string>>;

export function PredictionForm() {
  const [formData, setFormData] = useState<Partial<PredictionRequest>>({});
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const clearFieldError = (field: keyof PredictionRequest) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setFieldErrors({});

    // Normalize undefined values so field-level validators run instead of object key errors
    const dataToValidate = {
      gender: formData.gender ?? "",
      race_ethnicity: formData.race_ethnicity ?? "",
      parental_level_of_education: formData.parental_level_of_education ?? "",
      lunch: formData.lunch ?? "",
      test_preparation_course: formData.test_preparation_course ?? "",
      reading_score: formData.reading_score ?? null,
      writing_score: formData.writing_score ?? null,
    };

    const parseResult = v.safeParse(predictionSchema, dataToValidate);

    if (!parseResult.success) {
      const errors: FieldErrors = {};
      for (const issue of parseResult.issues) {
        const path = issue.path?.[0]?.key as keyof PredictionRequest | undefined;
        if (path) {
          errors[path] = issue.message;
        }
      }
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await predict(parseResult.output as PredictionRequest);
      setResult(response.prediction);
      setModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const updateField = <K extends keyof PredictionRequest>(
    field: K,
    value: PredictionRequest[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  };

  const updateNumberField = (
    field: "reading_score" | "writing_score",
    value: string
  ) => {
    const num = value === "" ? undefined : parseFloat(value);
    setFormData((prev) => ({ ...prev, [field]: num }));
    clearFieldError(field);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setResult(null), 300);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="max-w-5xl mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Demographics */}
            <div>
              <SectionHeading icon={User} title="Demographics" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender ?? ""}
                    onValueChange={(v) => updateField("gender", v as "male" | "female")}
                  >
                    <SelectTrigger suppressHydrationWarning id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldErrors.gender && (
                    <p className="text-xs text-destructive mt-1">{fieldErrors.gender}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ethnicity">Race or Ethnicity</Label>
                  <Select
                    value={formData.race_ethnicity ?? ""}
                    onValueChange={(v) => { if (v) updateField("race_ethnicity", v); }}
                  >
                    <SelectTrigger suppressHydrationWarning id="ethnicity">
                      <SelectValue placeholder="Select ethnicity" />
                    </SelectTrigger>
                    <SelectContent>
                      {["group A", "group B", "group C", "group D", "group E"].map((g) => (
                        <SelectItem key={g} value={g}>
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.race_ethnicity && (
                    <p className="text-xs text-destructive mt-1">{fieldErrors.race_ethnicity}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Socioeconomic Background */}
            <div>
              <SectionHeading icon={Briefcase} title="Socioeconomic Background" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="education">Parental Level of Education</Label>
                  <Select
                    value={formData.parental_level_of_education ?? ""}
                    onValueChange={(v) => { if (v) updateField("parental_level_of_education", v); }}
                  >
                    <SelectTrigger suppressHydrationWarning id="education">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "some high school",
                        "high school",
                        "some college",
                        "associate's degree",
                        "bachelor's degree",
                        "master's degree",
                      ].map((edu) => (
                        <SelectItem key={edu} value={edu}>
                          {edu.charAt(0).toUpperCase() + edu.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.parental_level_of_education && (
                    <p className="text-xs text-destructive mt-1">{fieldErrors.parental_level_of_education}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lunch">Lunch Type</Label>
                  <Select
                    value={formData.lunch ?? ""}
                    onValueChange={(v) =>
                      updateField("lunch", v as "free/reduced" | "standard")
                    }
                  >
                    <SelectTrigger suppressHydrationWarning id="lunch">
                      <SelectValue placeholder="Select lunch type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free/reduced">Free / Reduced</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldErrors.lunch && (
                    <p className="text-xs text-destructive mt-1">{fieldErrors.lunch}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test_prep">Test Preparation Course</Label>
                  <Select
                    value={formData.test_preparation_course ?? ""}
                    onValueChange={(v) =>
                      updateField("test_preparation_course", v as "none" | "completed")
                    }
                  >
                    <SelectTrigger suppressHydrationWarning id="test_prep">
                      <SelectValue placeholder="Select test prep" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldErrors.test_preparation_course && (
                    <p className="text-xs text-destructive mt-1">{fieldErrors.test_preparation_course}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Performance */}
            <div>
              <SectionHeading icon={BookOpen} title="Academic Performance" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="reading_score">Reading Score (0-100)</Label>
                  <Input
                    id="reading_score"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Enter reading score"
                    value={formData.reading_score ?? ""}
                    onChange={(e) => updateNumberField("reading_score", e.target.value)}
                  />
                  {fieldErrors.reading_score && (
                    <p className="text-xs text-destructive mt-1">{fieldErrors.reading_score}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="writing_score">Writing Score (0-100)</Label>
                  <Input
                    id="writing_score"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Enter writing score"
                    value={formData.writing_score ?? ""}
                    onChange={(e) => updateNumberField("writing_score", e.target.value)}
                  />
                  {fieldErrors.writing_score && (
                    <p className="text-xs text-destructive mt-1">{fieldErrors.writing_score}</p>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={loading} size="lg">
              <Sparkles className="h-4 w-4" />
              {loading ? "Predicting..." : "Predict"}
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <ErrorDisplay message={error} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      </motion.div>

      {/* Result Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {result !== null && <ResultCard score={result} />}
      </Modal>
    </>
  );
}
