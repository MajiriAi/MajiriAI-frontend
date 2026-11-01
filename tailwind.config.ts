import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#0a6cff",
          600: "#0a5ae0",
          700: "#0a4bb8",
          800: "#0b3d92",
          900: "#103a7a",
          950: "#0a1f45",
        },
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#7c6cf5",
          600: "#6d5ae8",
          700: "#5b47d1",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(10, 60, 140, 0.08)",
        glow: "0 10px 40px rgba(10, 108, 255, 0.25)",
        card: "0 1px 3px rgba(16, 42, 104, 0.06), 0 8px 24px rgba(16, 42, 104, 0.08)",
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(135deg, #0a6cff 0%, #7c6cf5 100%)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
