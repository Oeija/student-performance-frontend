"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Target, GitBranch, Layers, Database } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API_DOCS_URL } from "@/lib/constants";

const metrics = [
  {
    label: "R² Score",
    value: "0.88",
    description: "Model explains 88% of variance",
    icon: Target,
  },
  {
    label: "Algorithm",
    value: "Ridge Regression",
    description: "L2 regularized linear model",
    icon: GitBranch,
  },
  {
    label: "Cross-Validation",
    value: "5 Folds",
    description: "Robust performance estimation",
    icon: Layers,
  },
  {
    label: "Dataset",
    value: "1,000 Students",
    description: "Kaggle dataset",
    icon: Database,
  },
];

export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center items-center w-full overflow-hidden min-h-[calc(100dvh-3.5rem)] py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* Text + buttons: narrower, centred within the outer container */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Predict Student Math Score with{" "}
              <span className="text-primary">Machine Learning</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              An end-to-end ML pipeline that predicts student math performance based on
              demographic, socioeconomic, and academic features. Try the prediction to explore how different
              factors can influence student outcomes!
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/predict">
                <Button size="lg" className="gap-2">
                  Try Prediction <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href={API_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <BarChart3 className="h-4 w-4" /> API Docs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Metrics grid: fills the full outer container width */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <metric.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
