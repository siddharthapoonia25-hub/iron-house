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
        sky: "#c8dfed",
        sage: "#9bb084",
        terracotta: "#d96847",
        forest: "#2d3a2e",
        butter: "#f5d77c",
        peach: "#f4a896",
        mint: "#b8d8c8",
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
