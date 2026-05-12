/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070d",
          900: "#0a0d16",
          800: "#10141f",
          700: "#161c2b",
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
      },
      backgroundImage: {
        "angel-gradient":
          "linear-gradient(90deg, #F58A4B 0%, #F39966 35%, #7BC9E8 65%, #3FA3D1 100%)",
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(63,163,209,0.18), transparent 60%)",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.6" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-12px,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
      },
      animation: {
        pulseSlow: "pulseSlow 6s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
