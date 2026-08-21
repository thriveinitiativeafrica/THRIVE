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
            800: "#381A5F",
            700: "#3F2170",
            500: "#6C3FA6",
            300: "#9F75D6",
            100: "#EFE7F7",
            50: "#F8F4FC",
          },
          gold: {
            600: "#D4A017",
            500: "#E2AC1F",
            400: "#E8C34A",
            200: "#F5E39E",
            100: "#FBF0D3",
            50: "#FDF8EC",
          },
          teal: {
            700: "#155741",
            600: "#1F7A5C",
            400: "#32A882",
            100: "#E1F3EC",
            50: "#F0FAF6",
          },
          cream: {
            DEFAULT: "#FAF6EC",
            light: "#FDFBF7",
            dark: "#F3EAD3",
          },
          ink: {
            900: "#1B1526",
            800: "#2D253B",
            600: "#514A5E",
            400: "#787186",
          },
          border: "#E7E1EF",
        },
        sdg: {
          3: "#4C9F38",
          4: "#C5192D",
          5: "#FF3A21",
          10: "#DD1367",
          11: "#FD9D24",
          17: "#19486A",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        blob1: "60% 40% 30% 70% / 60% 30% 70% 40%",
        blob2: "40% 60% 70% 30% / 40% 40% 60% 55%",
        "quarter-tl": "160px 24px 24px 24px",
        "quarter-tr": "24px 160px 24px 24px",
        "quarter-br": "24px 24px 160px 24px",
        "quarter-bl": "24px 24px 24px 160px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
