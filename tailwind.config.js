/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "rgb(5, 12, 23)",
        lightTxt: "rgb(119, 128, 161)",
        lightBg: "#f5f5f5"
      }
    },
  },
  plugins: [],
}

