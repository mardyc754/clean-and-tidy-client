import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        emphasize: ['var(--font-outfit-semi-bold)'],
        link: ['var(--font-roboto-bold)']
      }
    }
  },
  plugins: []
} satisfies Config;
