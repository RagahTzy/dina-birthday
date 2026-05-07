"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HeartCardProps {
  message: string;
  emoji?: string;
  index: number;
  side?: "left" | "right";
  isSpecial?: boolean;
  backgroundImage?: string;
}

const HEART_MASK_STYLE: React.CSSProperties = {
  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 185'%3E%3Cpath d='M100,175 C100,175 10,105 10,55 C10,25 30,5 58,12 C74,16 88,28 100,44 C112,28 126,16 142,12 C170,5 190,25 190,55 C190,105 100,175 100,175Z' fill='black'/%3E%3C/svg%3E")`,
  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 185'%3E%3Cpath d='M100,175 C100,175 10,105 10,55 C10,25 30,5 58,12 C74,16 88,28 100,44 C112,28 126,16 142,12 C170,5 190,25 190,55 C190,105 100,175 100,175Z' fill='black'/%3E%3C/svg%3E")`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

export default function HeartCard({ message, emoji = "❤️", index, side = "left", isSpecial = false, backgroundImage }: HeartCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  /* ─── SPECIAL closing card ─── */
  if (isSpecial) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", position: "relative" }}
      >
        {/* Aspect ratio box — heart is ~92.5% tall relative to width */}
        <div style={{ position: "relative", paddingTop: "92.5%" }}>
          {/* Heart background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              ...HEART_MASK_STYLE,
              background: backgroundImage ? `url('${backgroundImage}')` : "linear-gradient(160deg, #fff0f6 0%, #ffd6eb 60%, #ffb3d1 100%)",
              backgroundSize: backgroundImage ? "cover" : undefined,
              backgroundPosition: backgroundImage ? "center" : undefined,
            }}
          />

          {/* Black overlay to darken background image */}
          {backgroundImage && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                ...HEART_MASK_STYLE,
                background: "rgba(0, 0, 0, 0.7)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Drop shadow layer (outside mask so shadow is visible) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              ...HEART_MASK_STYLE,
              background: "transparent",
              filter: "drop-shadow(0 12px 32px rgba(233,30,140,0.3))",
              pointerEvents: "none",
            }}
          />
          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "20% 25% 20% 25%",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: "1.5rem", marginBottom: 8 }}
            >
            </motion.div>
            <p
              style={{
                fontFamily: "'Knewave'",
                fontSize: "clamp(2.5rem, 2.5vw, 0.82rem)",
                fontWeight: 400,
                color: "white",
                whiteSpace: "pre-line",
                lineHeight: 1.45,
                WebkitTextStroke: "0.5px #be185d",
              }}
            >
              {message}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ─── Regular card — slides in from left or right ─── */
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -80 : 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 * (index % 2) }}
      whileHover={{ y: -5, scale: 1.03 }}
      style={{ width: "100%", position: "relative", cursor: "default" }}
    >
      {/* Aspect ratio box */}
      <div style={{ position: "relative", paddingTop: "92.5%" }}>

        {/* Heart-shaped card background — solid white/pink, readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            ...HEART_MASK_STYLE,
            background: backgroundImage ? `url('${backgroundImage}')` : "linear-gradient(150deg, #ffffff 0%, #fff0f6 55%, #ffdded 100%)",
            backgroundSize: backgroundImage ? "cover" : undefined,
            backgroundPosition: backgroundImage ? "center" : undefined,
            filter: "drop-shadow(0 6px 18px rgba(233,30,140,0.25))",
          }}
        />

        {/* Black overlay to darken background image */}
        {backgroundImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              ...HEART_MASK_STYLE,
              background: "rgba(0, 0, 0, 0.4)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Content — centered inside heart */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            // Padding pushes text away from clipped edges
            padding: "20% 25% 20% 25%",
          }}
        >
          <motion.span
            style={{ fontSize: "1.6rem", marginBottom: 6, display: "block" }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.25 }}
          >
            {emoji}
          </motion.span>
          <p
            style={{
              fontFamily: "'Knewave'",
              fontSize: "clamp(2rem, 2.5vw, 0.82rem)",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.45,
              WebkitTextStroke: "2px #be185d",
            }}
          >
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}