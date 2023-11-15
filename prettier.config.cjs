const config = {
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss')
  ],
  trailingComma: 'none',
  singleQuote: true,
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
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};

module.exports = config;
