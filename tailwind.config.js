/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        podium: ['"FSP DEMO - PODIUM Sharp 4.11"', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        command: '#07090B',
        carbon: '#101419',
        signal: '#FF2430',
        operative: '#F1F0EC',
        steel: '#93999F',
      },
    },
  },
  plugins: [],
};
