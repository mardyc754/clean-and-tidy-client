import { Html, Head, Main, NextScript } from 'next/document';
import { outfitSemiBold, robotoBold } from '~/settings/fontSetting';

export default function Document() {
  return (
    <Html
      lang="en"
      className={`${outfitSemiBold.variable} ${robotoBold.variable}`}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
