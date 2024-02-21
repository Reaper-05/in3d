/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xsm: "319px",
      extrasmall: "480px",
      small: "520px",
      mobile: "767px",
      medium: "991px",
      med: "920px",
      laptop: "1024px",
      screen: "1220px",
      desktop: "1400px",
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#D9D9D9",
      "gray-light": "#d3dce6",
      white: "#fff",
      black: "#000",
      primary: "rgba(118, 19, 217, 0.80)",
      red:"#ff0000",
    },
    fontSize: {
      xx: "12px",
      xsmall: "14px",
      small: "16px",
      medium: "18px",
      large: "22px",
      xlarge: "30px"
    },
  },
  plugins: [],
};
