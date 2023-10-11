import { type Config } from 'tailwindcss';
import headlessUIPlugin from '@headlessui/tailwindcss';

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
  plugins: [headlessUIPlugin({ prefix: 'ui' })]
} satisfies Config;
