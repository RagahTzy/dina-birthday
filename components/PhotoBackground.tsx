"use client";

import { motion } from "framer-motion";

// Photo placeholder grid - replace src with actual photo paths
// Put your photos in /public/photos/ folder: photo1.jpg, photo2.jpg, etc.
const PHOTOS = [
  "/photos/photo1.jpg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpg",
  "/photos/photo4.jpg",
  "/photos/photo5.jpg",
  "/photos/photo6.jpg",
  "/photos/photo7.jpg",
  "/photos/photo8.jpg",
  "/photos/photo9.jpg",
];

export default function PhotoBackground() {
  // Creates a grid of photos as background with fallback gradients
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Photo grid */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
        }}
      >
        {PHOTOS.map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient if photo not found
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Fallback gradient if no photo */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: `hsl(${320 + (i * 15) % 60}, ${70 + (i * 5) % 20}%, ${75 + (i * 3) % 15}%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,5,15,0.45) 0%, rgba(40,0,20,0.55) 50%, rgba(20,5,15,0.65) 100%)",
        }}
      />

      {/* Pink tint overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(233,30,140,0.15) 0%, rgba(244,143,177,0.1) 50%, rgba(233,30,140,0.2) 100%)",
        }}
      />

      {/* Blur */}
      <div className="absolute inset-0" style={{ backdropFilter: "blur(2px)" }} />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Floating heart silhouettes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-10 select-none pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${5 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
