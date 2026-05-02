import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        rose: {
          blush: "#FFB6C1",
          soft: "#FF8FAB",
          deep: "#E91E8C",
          dark: "#C2185B",
        },
        cream: "#FFF5F7",
        mauve: "#D4A5A5",
      },
      animation: {
        "float-up": "floatUp 3s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "bounce-gentle": "bounceGentle 1.5s ease-in-out infinite",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0px)", opacity: "1" },
          "100%": { transform: "translateY(-120vh)", opacity: "0" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
