import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        siam: {
          50: "#eef6ff",
          100: "#d9eaff",
          500: "#1f6fff",
          600: "#1557d6",
          900: "#0b1b3b",
        },
        gold: "#f4b942",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(11, 27, 59, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;