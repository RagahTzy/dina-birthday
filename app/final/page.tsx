"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getStoredName } from "@/utils/store";
import HeartCard from "@/components/HeartCard";
import HugModal from "@/components/HugModal";
import PhotoBackground from "@/components/PhotoBackground";
import MusicPlayer from "@/components/MusicPlayer";
import Confetti from "@/components/Confetti";

const CARDS = [
  {
    message: "Pertama kali ketemu kamu, aku tau kamu beda dari yang lain",
    emoji: "❤️",
    variant: "left" as const,
  },
  {
    message: "Makasih udah selalu sabar sama aku, bahkan di saat aku nyebelin",
    emoji: "💗",
    variant: "right" as const,
  },
  {
    message: "Aku bersyukur banget punya kamu di sisi aku",
    emoji: "✨",
    variant: "left" as const,
  },
  {
    message: "Kamu rumah terbaik yang pernah aku temukan",
    emoji: "🏡",
    variant: "right" as const,
  },
  {
    message: "Semoga kita lama banget yaa, selamanya kalau bisa",
    emoji: "💞",
    variant: "left" as const,
  },
  {
    message: "Senyum kamu itu obat paling ampuh buat aku",
    emoji: "🌸",
    variant: "right" as const,
  },
  {
    message: "Kamu itu bukan cuma pacar, kamu sahabat terbaik aku juga",
    emoji: "🫶",
    variant: "left" as const,
  },
];

const BIRTHDAY_MESSAGE = `🎉 Happy Birthday Sayangku 🎂

Semoga semua impian kamu tercapai.
Semoga selalu sehat dan kuat.
Semoga selalu bahagia setiap harinya.
Dan semoga aku selalu jadi bagian
dari bahagia kamu ❤️`;

// Launch hearts animation
const LAUNCH_HEARTS = ["❤️", "💗", "💕", "💓", "💞", "🌸", "✨", "💫", "🎀", "🌹"];

export default function FinalPage() {
  const router = useRouter();
  const [name, setName] = useState("Sayang");
  const [showModal, setShowModal] = useState(false);
  const [heartsLaunched, setHeartsLaunched] = useState<
    { id: number; emoji: string; x: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const stored = getStoredName();
    if (!stored) {
      router.push("/login");
      return;
    }
    setName(stored);

    // Launch hearts on enter
    const hearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: LAUNCH_HEARTS[i % LAUNCH_HEARTS.length],
      x: Math.random() * 100,
      size: Math.random() * 28 + 16,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 2,
    }));
    setHeartsLaunched(hearts);
  }, [router]);

  return (
    <main className="relative min-h-screen">
      {/* Photo collage background */}
      <PhotoBackground />

      {/* Confetti */}
      <Confetti />

      {/* Music player */}
      <MusicPlayer />

      {/* Launch hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
        {heartsLaunched.map((h) => (
          <motion.span
            key={h.id}
            className="absolute bottom-0 select-none"
            style={{
              left: `${h.x}%`,
              fontSize: h.size,
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: "-110vh", opacity: 0 }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              ease: "easeOut",
            }}
          >
            {h.emoji}
          </motion.span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Hero section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16"
        >
          {/* Top decoration */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-6xl mb-6"
          >
            🎂
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-3xl px-8 py-8 max-w-lg mx-auto"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/80 font-medium text-base mb-2 tracking-widest uppercase"
            >
              Spesial untuk
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {name} 🎀
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-white/90 text-xl font-medium"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              Di hari yang paling spesial ini...
            </motion.p>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-white/60"
            >
              <span className="text-sm font-medium tracking-wider">Scroll ke bawah</span>
              <span className="text-xl">↓</span>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Cards section */}
        <section className="relative px-4 py-16 max-w-2xl mx-auto w-full">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="glass rounded-2xl inline-block px-6 py-3">
              <p
                className="text-white text-2xl font-bold"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                hal-hal yang pengen aku bilang ke kamu 💌
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {CARDS.map((card, i) => (
              <HeartCard
                key={i}
                message={card.message}
                emoji={card.emoji}
                index={i}
                variant={card.variant}
              />
            ))}
          </div>
        </section>

        {/* Special closing card */}
        <section className="px-4 pb-24 max-w-2xl mx-auto w-full">
          <HeartCard
            message={BIRTHDAY_MESSAGE}
            index={CARDS.length}
            isSpecial={true}
          />

          {/* Hug button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 8px 24px rgba(233,30,140,0.3)",
                  "0 16px 40px rgba(233,30,140,0.5)",
                  "0 8px 24px rgba(233,30,140,0.3)",
                ],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="px-10 py-5 rounded-2xl font-bold text-white text-xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #e91e8c 0%, #f06292 50%, #e91e8c 100%)",
                backgroundSize: "200% auto",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Peluk Virtual</span>
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  className="text-2xl"
                >
                  🤗
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="glass rounded-2xl inline-block px-6 py-4">
              <p
                className="text-white/90 text-xl font-bold"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                dengan cinta dari orang yang sayang kamu ❤️
              </p>
              <p className="text-white/60 text-sm mt-1">
                {new Date().getFullYear()} — forever and always
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Hug modal */}
      <HugModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        name={name}
      />
    </main>
  );
}
