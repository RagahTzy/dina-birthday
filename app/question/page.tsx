"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clearStoredName, getStoredName, isAuthorizedName } from "@/utils/store";
import FloatingHearts from "@/components/FloatingHearts";
import Sparkles from "@/components/Sparkles";

export default function QuestionPage() {
  const router = useRouter();
  const [name, setName] = useState("Sayang");
  const [noClickCount, setNoClickCount] = useState(0);
  const [noVisible, setNoVisible] = useState(true);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [noOpacity, setNoOpacity] = useState(1);
  const [showMessage, setShowMessage] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const NO_MESSAGES = [
    "Hehe jangan diklik 😏",
    "Coba lagi deh 😂",
    "Yakin? 🤔",
    "Nggak mungkin kan? 🥺",
    "Hayolah... 😅",
    "Udah ah 🙈",
    "Jujur deh 💕",
  ];

  useEffect(() => {
    const stored = getStoredName();
    if (!stored || !isAuthorizedName(stored)) {
      clearStoredName();
      router.push("/login");
      return;
    }
    setName(stored);
  }, [router]);

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    // Show funny message
    const msg = NO_MESSAGES[Math.min(newCount - 1, NO_MESSAGES.length - 1)];
    setShowMessage(msg);
    setTimeout(() => setShowMessage(""), 1500);

    // Move randomly within viewport
    const maxX = 160;
    const maxY = 80;
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    setNoPosition({ x: newX, y: newY });

    // Shrink and fade
    const newScale = Math.max(0.1, noScale - 0.13);
    const newOpacity = Math.max(0, noOpacity - 0.15);
    setNoScale(newScale);
    setNoOpacity(newOpacity);

    // Hide after enough clicks
    if (newCount >= 7 || newOpacity <= 0.15) {
      setTimeout(() => setNoVisible(false), 300);
    }
  };

  const handleYesClick = async () => {
    setIsNavigating(true);
    await new Promise((r) => setTimeout(r, 500));
    router.push("/final");
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ffe4f0 0%, #ffc8dd 30%, #ffafcc 60%, #ffe0ed 100%)",
      }}
    >
      {/* Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-pink-200 opacity-40 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-rose-200 opacity-30 blur-3xl -z-10" />

      <FloatingHearts count={14} />
      <Sparkles />

      {/* Floating message toast */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 glass-strong px-6 py-3 rounded-2xl text-pink-600 font-bold shadow-lg"
          >
            {showMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-4 relative"
      >
        {/* Question emoji */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl mb-6 select-none"
        >
          🥺
        </motion.div>

        {/* Question text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h1
            className="text-4xl md:text-6xl font-bold text-pink-700 mb-3"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {name},
          </h1>
          <h2
            className="text-3xl md:text-5xl font-bold text-gradient-rose"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            kamu sayang aku gak?
          </h2>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 relative"
          style={{ minHeight: 80 }}
        >
          {/* YES button */}
          <motion.button
            onClick={handleYesClick}
            disabled={isNavigating}
            whileHover={{
              scale: noVisible ? 1.05 : 1.1,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            animate={
              !noVisible
                ? {
                    scale: [1, 1.08, 1],
                  }
                : {}
            }
            transition={
              !noVisible
                ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                : {}
            }
            className="px-8 py-4 rounded-2xl font-bold text-white text-lg shadow-xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #e91e8c 0%, #f06292 100%)",
              boxShadow: "0 8px 24px rgba(233,30,140,0.35)",
              minWidth: 160,
            }}
          >
            <span className="relative z-10">Sayang bangettt 💗</span>
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity"
              style={{
                background:
                  "linear-gradient(90deg, transparent, white, transparent)",
              }}
            />
          </motion.button>

          {/* NO button - fleeing */}
          <AnimatePresence>
            {noVisible && (
              <motion.button
                onClick={handleNoClick}
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                  scale: noScale,
                  opacity: noOpacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                exit={{ opacity: 0, scale: 0 }}
                className="px-7 py-4 rounded-2xl font-bold text-pink-400 text-base border-2 border-pink-200 bg-white/70 shadow-md cursor-pointer select-none"
                style={{
                  pointerEvents: noOpacity < 0.2 ? "none" : "auto",
                  fontSize: `${Math.max(10, 16 * noScale)}px`,
                }}
              >
                GK. 😒
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* After no disappears */}
        <AnimatePresence>
          {!noVisible && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-sm bg-black/70 text-white px-4 py-2 rounded-2xl inline-block shadow-lg"
            >
              Itu bukan pilihan yang valid 💕
            </motion.p>
          )}
        </AnimatePresence>

        {/* No click counter hint */}
        {noClickCount > 0 && noVisible && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-sm bg-black/70 text-white px-4 py-2 rounded-2xl inline-block shadow-lg"
          >
            {noClickCount === 1 && "Heh? 🤨"}
            {noClickCount === 2 && "Masih mau coba? 😅"}
            {noClickCount >= 3 && noClickCount < 5 && "Tombolnya juga nggak mau dipilih 😂"}
            {noClickCount >= 5 && "Udah nyerah aja deh 🥰"}
          </motion.p>
        )}
      </motion.div>

      {/* Navigate overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(255,182,193,0.6)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl"
            >
              ❤️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
