/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#3b512f",
        "background-light": "#f7f7f6",
        "background-dark": "#181c16",
      },
      fontFamily: {
        "display": ["var(--font-clash)", "sans-serif"],
        "body": ["var(--font-roundo)", "sans-serif"],
        "sans": ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem", 
        "lg": "0.5rem", 
        "xl": "0.75rem", 
        "full": "9999px"
      },
    },
  },
  plugins: [],
};
