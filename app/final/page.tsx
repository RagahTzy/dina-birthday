"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clearStoredName, getStoredName, isAuthorizedName } from "@/utils/store";
import HeartCard from "@/components/HeartCard";
import HugModal from "@/components/HugModal";
import PhotoBackground from "@/components/PhotoBackground";
import MusicPlayer from "@/components/MusicPlayer";
import Confetti from "@/components/Confetti";

const CARDS = [
  { message: "Pertama kali ketemu kamu, aku tau kamu beda dari yang lain", emoji: "❤️", side: "left" as const, backgroundImage: "/photos/card1.jpg" },
  { message: "Makasih udah selalu sabar sama aku, bahkan di saat aku nyebelin", emoji: "💗", side: "right" as const, backgroundImage: "/photos/card2.jpg" },
  { message: "Aku bersyukur banget punya kamu di sisi aku", emoji: "✨", side: "left" as const, backgroundImage: "/photos/card3.jpg" },
  { message: "Kamu rumah terbaik yang pernah aku temukan", emoji: "🏡", side: "right" as const, backgroundImage: "/photos/card4.jpg" },
  { message: "Semoga kita lama banget yaa, selamanya kalau bisa", emoji: "💞", side: "left" as const, backgroundImage: "/photos/card5.jpg" },
  { message: "Senyum kamu itu obat paling ampuh buat aku", emoji: "🌸", side: "right" as const, backgroundImage: "/photos/card6.jpg" },
  { message: "Kamu itu bukan cuma pacar, kamu sahabat terbaik aku juga", emoji: "🫶", side: "left" as const, backgroundImage: "/photos/card7.jpg" },
  { message: "Setiap hari sama kamu selalu jadi hari terbaik aku", emoji: "💫", side: "right" as const, backgroundImage: "/photos/photo8.jpg" },
];

const BIRTHDAY_MESSAGE = `Happy Birthday\nSayangku 🎂\n\nSemoga semua impian\nkamu tercapai.\nSelalu sehat, selalu bahagia.\nDan semoga aku selalu\njadi bagian dari\nbahagia kamu ❤️`;

const LAUNCH_HEARTS = ["❤️", "💗", "💕", "💓", "💞", "🌸", "✨", "💫", "🎀", "🌹"];

// Inline SVG mask — reliable, works everywhere
const HEART_MASK_STYLE = {
  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 185'%3E%3Cpath d='M100,175 C100,175 10,105 10,55 C10,25 30,5 58,12 C74,16 88,28 100,44 C112,28 126,16 142,12 C170,5 190,25 190,55 C190,105 100,175 100,175Z' fill='black'/%3E%3C/svg%3E")`,
  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 185'%3E%3Cpath d='M100,175 C100,175 10,105 10,55 C10,25 30,5 58,12 C74,16 88,28 100,44 C112,28 126,16 142,12 C170,5 190,25 190,55 C190,105 100,175 100,175Z' fill='black'/%3E%3C/svg%3E")`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

export default function FinalPage() {
  const router = useRouter();
  const [name, setName] = useState("Sayang");
  const [showModal, setShowModal] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [heartsLaunched, setHeartsLaunched] = useState<
    { id: number; emoji: string; x: number; size: number; duration: number; delay: number }[]
  >([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = getStoredName();
    if (!stored || !isAuthorizedName(stored)) {
      clearStoredName();
      router.push("/login");
      return;
    }
    setName(stored);
    setHeartsLaunched(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        emoji: LAUNCH_HEARTS[i % LAUNCH_HEARTS.length],
        x: Math.random() * 100,
        size: Math.random() * 28 + 16,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 2,
      }))
    );
  }, [router]);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowScrollHint(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Pair cards into rows of 2
  const cardRows: (typeof CARDS[number] | null)[][] = [];
  for (let i = 0; i < CARDS.length; i += 2) {
    cardRows.push([CARDS[i], CARDS[i + 1] ?? null]);
  }

  return (
    <main className="relative min-h-screen">
      <PhotoBackground />
      <Confetti />
      <MusicPlayer />

      {/* Launch hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
        {heartsLaunched.map((h) => (
          <motion.span key={h.id} className="absolute bottom-0 select-none"
            style={{ left: `${h.x}%`, fontSize: h.size }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: "-110vh", opacity: 0 }}
            transition={{ duration: h.duration, delay: h.delay, ease: "easeOut" }}>
            {h.emoji}
          </motion.span>
        ))}
      </div>

      {/* ── Scroll hint — truly centered using left+marginLeft trick ── */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              bottom: 28,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: 999,
                padding: "8px 22px 10px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span style={{ color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Scroll ke bawah
              </span>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1 }}>↓</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col">

        {/* ══ HERO — heart shape with photo inside ══ */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        >
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", width: "min(92vw, 480px)" }}
          >
            {/* Outer drop-shadow wrapper — NOT masked, so shadow is visible */}
            <div style={{
              filter: "drop-shadow(0 20px 48px rgba(200,0,80,0.4))",
              position: "relative",
              paddingTop: "92%",
            }}>
              {/* Single masked container — photo bg + dark overlay + text all inside heart */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  ...HEART_MASK_STYLE,
                  // Photo background
                  backgroundImage: "url('/photos/kucing.jpeg')",
                  backgroundSize: "60% auto",
                  backgroundPosition: "50% 30%",
                  backgroundColor: "#f06292", // fallback
                  overflow: "hidden",
                }}
              >
                {/* Dark gradient overlay so text is readable */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.55) 100%)",
                }}/>

                {/* Text — centered lower inside the heart */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                  style={{
                    position: "absolute",
                    bottom: "35%",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    padding: "0 22%",
                    background: "rgba(0,0,0,0.5)",
                    backgroundSize: "300% auto",
                  }}
                >
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                    Spesial untuk
                  </p>
                  <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1.6rem, 5vw, 2.4rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
                    {name} 🎀
                  </h1>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)", marginTop: 5, textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
                    Di hari yang paling spesial ini...
                  </p>
                </motion.div>

                {/* Cake emoji — upper center */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 220 }}
                  style={{ position: "absolute", top: "27%", left: "45%", transform: "translateX(-50%)", fontSize: "2.4rem", pointerEvents: "none", userSelect: "none" }}
                >
                  🎂
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ══ Section label ══ */}
        <div className="px-4 pt-4 pb-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 20,
              padding: "12px 28px",
            }}
          >
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(1.1rem, 4vw, 1.5rem)", fontWeight: 700, color: "white", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
              hal-hal yang pengen aku bilang ke kamu 💌
            </p>
          </motion.div>
        </div>

        {/* ══ Cards — 2 column grid, slide in from left/right ══ */}
        <section className="px-3 pb-10 w-full mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {CARDS.map((card, i) => (
              <HeartCard
                key={i}
                message={card.message}
                emoji={card.emoji}
                index={i}
                side={card.side}
                backgroundImage={card.backgroundImage}
              />
            ))}
          </div>
        </section>

        {/* ══ Special closing card — centered, wider ══ */}
        <section className="px-4 pb-8 flex justify-center w-full mx-auto">
          <HeartCard
            message={BIRTHDAY_MESSAGE}
            index={CARDS.length}
            isSpecial
            backgroundImage="/photos/photo9.jpg"
          />
        </section>

        {/* ══ Hug button ══ */}
        <div className="pb-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0 8px 24px rgba(233,30,140,0.3)", "0 16px 40px rgba(233,30,140,0.55)", "0 8px 24px rgba(233,30,140,0.3)"] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              className="px-10 py-5 rounded-2xl font-bold text-white text-xl flex items-center gap-2"
              style={{ background: "linear-gradient(135deg,#e91e8c,#f06292)" }}
            >
              Peluk Virtual
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} className="text-2xl">🤗</motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* ══ Footer ══ */}
        <div ref={footerRef} className="pb-24 flex justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              background: "rgba(0,0,0,0.38)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 20,
              padding: "18px 32px",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.25rem", fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>
              dengan cinta dari orang yang sayang kamu ❤️
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: 4 }}>
              {new Date().getFullYear()} — forever and always
            </p>
          </motion.div>
        </div>

      </div>

      <HugModal isOpen={showModal} onClose={() => setShowModal(false)} name={name} />
    </main>
  );
}