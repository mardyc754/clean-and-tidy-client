type SummaryTypographyProps = {
  label: string;
  value: string;
  size?: 'medium' | 'large';
  className?: string;
};

const SummaryTypography = ({
  label,
  value,
  size = 'medium'
}: SummaryTypographyProps) => {
  const sizeMap = new Map([
    ['medium', { textClasses: 'text-xl', wrapperClasses: 'mt-2 py-2' }],
    ['large', { textClasses: 'text-3xl', wrapperClasses: 'mt-6 py-6' }]
  ]);

  const sizeClass = sizeMap.get(size);

  return (
    <div className={`border-t-4 ${sizeClass?.wrapperClasses}`}>
      <p
        className={`flex items-center justify-between text-2xl ${sizeClass?.textClasses}`}
      >
        {label}
        <span className={`font-emphasize text-cyan-500`}>{value}</span>
      </p>
    </div>
  );
};

export default SummaryTypography;
