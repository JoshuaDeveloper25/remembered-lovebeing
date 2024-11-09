const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "primary-color": "#0a023b",
        "primary-color-light": "#04bffa",
        "secondary-color": "#1369C3",
        "tertiary-color": "#7b7b71",
        "fourth-color": "#111827",
        "muted-color": "#6b7280",
        "modern-color": "#3a4651",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
