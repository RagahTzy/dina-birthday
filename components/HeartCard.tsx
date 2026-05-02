"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HeartCardProps {
  message: string;
  emoji?: string;
  index: number;
  variant?: "left" | "right" | "center";
  isSpecial?: boolean;
}

export default function HeartCard({
  message,
  emoji = "❤️",
  index,
  variant = "center",
  isSpecial = false,
}: HeartCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const slideVariants = {
    left: { initial: { opacity: 0, x: -60, rotate: -3 }, animate: { opacity: 1, x: 0, rotate: 0 } },
    right: { initial: { opacity: 0, x: 60, rotate: 3 }, animate: { opacity: 1, x: 0, rotate: 0 } },
    center: { initial: { opacity: 0, y: 40, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } },
  };

  const chosen = slideVariants[variant];

  if (isSpecial) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60, scale: 0.85 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative"
      >
        <div
          className="relative rounded-[2.5rem] p-8 md:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,248,0.98) 100%)",
            border: "2px solid rgba(244,143,177,0.4)",
            boxShadow:
              "0 20px 60px rgba(233,30,140,0.15), 0 8px 24px rgba(233,30,140,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Decorative hearts corner */}
          <span className="absolute top-4 left-4 text-2xl opacity-40">💗</span>
          <span className="absolute top-4 right-4 text-2xl opacity-40">💗</span>
          <span className="absolute bottom-4 left-4 text-2xl opacity-40">💗</span>
          <span className="absolute bottom-4 right-4 text-2xl opacity-40">💗</span>

          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(244,143,177,0.1) 0%, transparent 70%)",
            }}
          />

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl mb-4"
          >
            🎉
          </motion.div>

          <div
            className="text-2xl md:text-3xl font-bold text-pink-700 mb-4 whitespace-pre-line leading-relaxed"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {message}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={chosen.initial}
      animate={isInView ? chosen.animate : chosen.initial}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.05 * index,
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative group cursor-default"
    >
      <div
        className="relative rounded-3xl px-7 py-7 romantic-card"
        style={{
          boxShadow:
            "0 8px 32px rgba(233,30,140,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Side accent */}
        <div
          className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #f48fb1, transparent)",
            opacity: 0.6,
          }}
        />

        <div className="pl-3 flex items-start gap-4">
          <motion.span
            className="text-2xl flex-shrink-0 mt-0.5"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
          >
            {emoji}
          </motion.span>
          <p
            className="text-lg md:text-xl text-pink-800 font-medium leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
