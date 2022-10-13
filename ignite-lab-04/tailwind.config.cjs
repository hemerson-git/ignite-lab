/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "14px",
      md: "16px",
      lg: "18px",
      "2xl": "20px",
      "3xl": "24px",
      "4xl": "32px",
    },

    colors: {
      white: "#FFF",
      black: "#000",
      transparent: "transparent",

      gray: {
        900: "#121214",
        800: "#202024",
        400: "#7c7c8a",
        200: "#c4c4cc",
        100: "#e1e1e6",
      },

      cyan: {
        500: "#81d8f7",
        300: "#98E1FB",
      },
    },
    extend: {
      fontFamily: "Inter, sans-serif",
    },
  },
  plugins: [],
};
