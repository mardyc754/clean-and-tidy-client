import { Outfit, Roboto } from 'next/font/google';

export const outfitSemiBold = Outfit({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-outfit-semi-bold'
});

export const robotoBold = Roboto({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-roboto-bold'
});
