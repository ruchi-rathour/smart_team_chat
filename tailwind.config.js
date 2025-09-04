/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files in src
    "./public/index.html", // Scan index.html in public folder
  ],
  theme: {
    extend: {
      colors: {
        stcBg: "#0b0f19", // Dark background
        stcFg: "#e6e8ef", // Foreground text
        stcAccent: "#4f46e5", // Gradient/button accent
        stcAccent2: "#22d3ee", // Secondary gradient accent
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
        ],
      },
    },
  },
  plugins: [],
};
