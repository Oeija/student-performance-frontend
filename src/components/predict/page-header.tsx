"use client";

import { motion } from "framer-motion";

export function PredictPageHeader() {
  return (
    <div className="text-center mb-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold tracking-tight"
      >
        What Could a Student&apos;s Math Score Look Like?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-muted-foreground mt-2"
      >
        Fill in the student details below to get an AI-powered prediction.
      </motion.p>
    </div>
  );
}
