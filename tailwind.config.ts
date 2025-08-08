// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'fade-scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-scale-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
      },
      animation: {
        'fade-scale-in': 'fade-scale-in 0.3s ease-out forwards',
        'fade-scale-out': 'fade-scale-out 0.2s ease-in forwards',
      },
    },
  },
  plugins: [],
};

export default config;
