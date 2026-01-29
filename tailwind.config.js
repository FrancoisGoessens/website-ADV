/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern:
        /bg-(gray|blue|green|red|yellow|orange|purple|pink)-(500|600|700|800)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
