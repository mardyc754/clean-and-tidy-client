/** @type {import("prettier").Config} */
const config = {
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss')
  ],
  trailingComma: 'none',
  singleQuote: true,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  importOrder: [
    '^~/server/(.*)$',
    '^~/settings/(.*)$',
    '^~/constants/(.*)$',
    '^~/assets/(.*)$',
    '^~/lib/(.*)$',
    '^~/api/(.*)$',
    '^~/schemas/(.*)$',
    '^~/stores/(.*)$',
    '^~/hooks/(.*)$',
    '^~/components/(.*)$',
    '^~/utils/(.*)$',
    '^~/types/(.*)$',
    '^~/styles/globals.css$',
    '^~/styles/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};

module.exports = config;
