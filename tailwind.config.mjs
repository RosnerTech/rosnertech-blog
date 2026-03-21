/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:    { DEFAULT: '#0c0f0a', 2: '#111510', 3: '#171e13' },
        green: { DEFAULT: '#52b788', dark: '#2d6a4f', bright: '#74c69d', extra: '#95d5b2' },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  // SEM plugin typography — controlamos tudo via CSS global
  plugins: [],
};
