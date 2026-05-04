import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f5ede0",
        sage: "#8a9a7b",
        terracotta: "#c2563a",
        forest: "#2d3a2e",
        butter: "#f0d97f",
        charcoal: "#1a1a1a",
        offwhite: "#faf6ef",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        accent: ["var(--font-italiana)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
