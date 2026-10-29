import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        thrive: {
          purple: {
            900: "#2E1650",
            800: "#241140",
            700: "#3F2170",
            100: "#F3EEFA",
            50: "#FAF7FD",
          },
          gold: {
            600: "#D4A017",
            500: "#E2AC1F",
            400: "#E8C34A",
            100: "#FBF0D3",
          },
          cream: {
            DEFAULT: "#FAF6EC",
            light: "#FDFBF7",
          },
          ink: {
            900: "#2E1650",
            800: "#374151",
            600: "#4B5563",
            400: "#9CA3AF",
          },
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
