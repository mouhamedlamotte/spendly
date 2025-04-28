/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class", // dark mode basé sur la classe
  theme: {
    extend: {
      colors: {
        background: "#080808", // vrai fond noir charbon
        foreground: "#e5e5e5", // texte clair
        primary: {
          DEFAULT: "#6366f1", // indigo
          dark: "#4f46e5",
          light: "#818cf8",
        },
        secondary: {
          DEFAULT: "#22d3ee", // cyan
          dark: "#06b6d4",
          light: "#67e8f9",
        },
        muted: {
          DEFAULT: "#374151", // gris bleu
          dark: "#1f2937",
          light: "#6b7280",
        },
        error: "#ef4444", // rouge erreur
        success: "#22c55e", // vert succès
        warning: "#f59e0b", // jaune warning
      },
      borderRadius: {
        xl: "1rem", // pour avoir des cartes bien smooth
      },
    },
  },
  plugins: [],
};
