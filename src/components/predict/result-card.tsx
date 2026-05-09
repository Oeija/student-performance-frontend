"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Trophy } from "lucide-react";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export function ResultCard({ score }: { score: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="text-center pt-2"
    >
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Trophy className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h3 className="text-base font-medium text-muted-foreground mb-1">
        Predicted Math Score
      </h3>
      <div className="text-6xl font-bold tracking-tight my-3">
        <AnimatedNumber value={score} />
        <span className="text-2xl text-muted-foreground ml-1">/ 100</span>
      </div>
    </motion.div>
  );
}
