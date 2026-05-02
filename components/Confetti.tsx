"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [run, setRun] = useState(true);

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Stop confetti after 8 seconds
    const timer = setTimeout(() => setRun(false), 8000);

    return () => {
      window.removeEventListener("resize", updateSize);
      clearTimeout(timer);
    };
  }, []);

  if (!run) return null;

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={true}
      numberOfPieces={120}
      gravity={0.08}
      colors={[
        "#f48fb1",
        "#e91e8c",
        "#f8bbd0",
        "#fce4ec",
        "#ff80ab",
        "#ff4081",
        "#ffffff",
        "#ffd1dc",
        "#ffb3c6",
      ]}
      confettiSource={{
        x: dimensions.width / 2,
        y: -10,
        w: dimensions.width,
        h: 0,
      }}
      tweenDuration={200}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 100, pointerEvents: "none" }}
    />
  );
}
