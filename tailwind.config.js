/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1d2021",
        secondary: {
          DEFAULT: "#8ec07c",
          100: "#80ad70",
          200: "#729a63",
        },
        black: {
          DEFAULT: "#000000",
          100: "#282828",
          200: "#3c383c",
        },
        white: {
          DEFAULT: "#fbf1c7",
          100: "#ebdbb2",
          200: "#d5c4a1",
        },
        gray: {
          100: "#a89984",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
