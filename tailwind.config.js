/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#000000",
          900: "#050608",
          800: "#0a0c10",
          700: "#10131a",
          600: "#1a1f2a",
        },
        bone: {
          50: "#f4f6f8",
          100: "#e6ebf0",
          200: "#c8d0d9",
          300: "#9aa3af",
          400: "#6e7884",
        },
        angel: {
          orange: "#F58A4B",
          coral: "#F39966",
          sky: "#7BC9E8",
          blue: "#3FA3D1",
          deep: "#1E5A8A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "angel-grad":
          "linear-gradient(90deg, #F58A4B 0%, #F39966 30%, #7BC9E8 65%, #3FA3D1 100%)",
        "angel-grad-cool":
          "linear-gradient(135deg, #7BC9E8 0%, #3FA3D1 50%, #1E5A8A 100%)",
      },
      letterSpacing: {
        "tightest": "-0.04em",
      },
    },
  },
  plugins: [],
};
