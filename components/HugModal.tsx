"use client";

import { motion, AnimatePresence } from "framer-motion";

interface HugModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

export default function HugModal({ isOpen, onClose, name }: HugModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(255, 182, 193, 0.5)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full text-center"
            >
              <div
                className="rounded-[2.5rem] p-10 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #fff 0%, #fff0f6 50%, #ffe4ef 100%)",
                  border: "2px solid rgba(244,143,177,0.5)",
                  boxShadow:
                    "0 32px 80px rgba(233,30,140,0.2), 0 8px 24px rgba(233,30,140,0.15)",
                }}
              >
                {/* BG decoration */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-pink-100 opacity-60" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-rose-100 opacity-60" />

                {/* Content */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  className="text-6xl mb-5 relative"
                >
                  🤗
                </motion.div>

                {/* Hearts rain inside modal */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2.5rem]">
                  {["❤️", "💗", "💕", "✨"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-2xl"
                      initial={{
                        y: "110%",
                        x: `${20 + i * 20}%`,
                        opacity: 0,
                      }}
                      animate={{ y: "-10%", opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>

                <h2
                  className="text-3xl font-bold text-pink-700 mb-3 relative"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Aku sayang kamu
                </h2>
                <h3
                  className="text-4xl font-bold text-gradient-rose mb-4 relative"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  bangettt ❤️
                </h3>

                <p className="text-pink-500 font-medium text-base mb-6 relative">
                  Makasih udah mau jadi bagian dari hidup aku, {name} 🥹
                </p>

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-2xl text-white font-bold text-base relative"
                  style={{
                    background: "linear-gradient(135deg, #e91e8c, #f06292)",
                    boxShadow: "0 4px 16px rgba(233,30,140,0.3)",
                  }}
                >
                  Makasih yaa 💕
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
