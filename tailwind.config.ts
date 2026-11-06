/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/app/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
