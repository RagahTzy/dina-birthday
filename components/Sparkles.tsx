"use client";

import { motion } from "framer-motion";

interface SparkleProps {
  className?: string;
}

export default function Sparkles({ className = "" }: SparkleProps) {
  const sparkles = [
    { top: "10%", left: "8%", size: 16, delay: 0 },
    { top: "20%", right: "10%", size: 12, delay: 0.5 },
    { top: "60%", left: "5%", size: 20, delay: 1 },
    { top: "80%", right: "8%", size: 14, delay: 1.5 },
    { top: "40%", right: "4%", size: 10, delay: 0.8 },
    { top: "50%", left: "3%", size: 18, delay: 0.3 },
  ];

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-300 select-none"
          style={{
            top: s.top,
            left: (s as { left?: string }).left,
            right: (s as { right?: string }).right,
            fontSize: s.size,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
