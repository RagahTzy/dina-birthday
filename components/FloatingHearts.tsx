"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const HEART_EMOJIS = ["❤️", "💗", "💕", "💓", "💞", "🌸", "✨", "💫"];

export default function FloatingHearts({ count = 12 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 14,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 8,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="particle absolute bottom-0 select-none"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: 0,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
