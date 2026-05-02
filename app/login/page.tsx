"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { setStoredName } from "@/utils/store";
import FloatingHearts from "@/components/FloatingHearts";
import Sparkles from "@/components/Sparkles";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Isi dulu dongg 😚");
      // Shake animation trigger
      setTimeout(() => setError(""), 3000);
      return;
    }
    setIsLoading(true);
    setStoredName(name.trim());
    // Small delay for loading feel
    await new Promise((r) => setTimeout(r, 600));
    router.push("/question");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #ffe0f0 0%, #ffc2d4 25%, #ffb3c6 50%, #ffd6e8 75%, #fff0f5 100%)",
        }}
      />

      {/* Soft blobs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-pink-200 opacity-40 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-rose-200 opacity-30 blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-100 opacity-50 blur-3xl -z-10" />

      <FloatingHearts count={10} />
      <Sparkles />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md mx-4"
      >
        {/* Decorative top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-4"
        >
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
            className="text-5xl inline-block"
          >
            🎀
          </motion.span>
        </motion.div>

        <div className="glass-strong rounded-3xl p-8 shadow-2xl glow-soft relative overflow-hidden">
          {/* Inner decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-pink-100 opacity-50 blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-rose-100 opacity-50 blur-xl translate-y-1/2 -translate-x-1/2" />

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8 relative"
          >
            <h1
              className="text-3xl md:text-4xl font-bold mb-3 text-gradient-rose"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Hai cantik 🎀
            </h1>
            <p className="text-pink-500 font-medium text-base leading-relaxed">
              Masukin nama panggilan kamu dulu yaa...
            </p>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-4"
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">💌</span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="nama kamu..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 text-pink-800 placeholder-pink-300 font-medium text-base outline-none focus:border-pink-400 focus:bg-white transition-all duration-300 shadow-inner"
                autoFocus
              />
            </div>
          </motion.div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="text-rose-500 text-sm font-medium text-center mb-4 bg-rose-50 rounded-xl py-2 px-4"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={handleSubmit}
              disabled={isLoading}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 relative overflow-hidden shadow-lg btn-press"
              style={{
                background: "linear-gradient(135deg, #e91e8c 0%, #f06292 50%, #e91e8c 100%)",
                backgroundSize: "200% auto",
              }}
            >
              <motion.span
                animate={isLoading ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="text-xl">⏳</span>
                    <span>Sebentar yaa...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk</span>
                    <span className="text-xl">💌</span>
                  </>
                )}
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-4 text-pink-400 text-sm font-medium"
        >
          ✨ ada sesuatu yang spesial untukmu ✨
        </motion.p>
      </motion.div>
    </main>
  );
}
