"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMusicalNote, HiSpeakerXMark } from "react-icons/hi2";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Show hint for 3 seconds
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
    setShowHint(false);
  };

  return (
    <>
      {/* 
        Replace the src below with your music file.
        Put your .mp3 file in /public/music.mp3
        Free romantic music: https://pixabay.com/music/
      */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="glass-strong rounded-2xl px-4 py-2 text-sm text-pink-600 font-medium shadow-lg whitespace-nowrap"
            >
              🎵 Klik untuk musik romantis
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full glass-strong shadow-lg flex items-center justify-center text-pink-500 hover:text-pink-600 transition-colors glow-soft"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
          >
            {isPlaying ? (
              <HiMusicalNote className="w-5 h-5" />
            ) : (
              <HiSpeakerXMark className="w-5 h-5" />
            )}
          </motion.div>
        </motion.button>
      </div>
    </>
  );
}
