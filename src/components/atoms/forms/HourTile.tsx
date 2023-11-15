import { changeHourToDate } from '~/utils/dateUtils';

import { MediumTypography } from '../typography/regular-text';

type HourTileProps = {
  value: number;
  selected?: boolean;
  available?: boolean;
  disabled?: boolean;
  onSelect: (value: number) => void;
};

const getHourTileStyle = (
  selected: boolean,
  disabled: boolean,
  available: boolean
) => {
  if (disabled) {
    // disabled hour tile is lighter than enabled
    return available ? 'bg-cyan-100' : 'bg-slate-200';
  }

  if (available) {
    return selected ? 'bg-cyan-500' : 'bg-cyan-200';
  }

  // if the hour is inavailable
  return 'bg-slate-400';
};

/**
 * Simple hour tile component
 * It probably will be using dayjs: https://www.npmjs.com/package/dayjs
 */
const HourTile = ({
  value,
  onSelect,
  available = false,
  selected = false,
  disabled = false
}: HourTileProps) => {
  const hourTileBackgroundStyle = getHourTileStyle(
    selected,
    disabled,
    available
  );

  const cursorStyle =
    !disabled && available ? 'cursor-pointer' : 'cursor-default';

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (disabled || !available) {
      return;
    }

    onSelect(parseInt(e.currentTarget.getAttribute('data-value')!));
  };

  return (
    <div
      role="radio"
      onClick={onClick}
      data-value={value}
      className={`flex items-center justify-center px-4 py-2 ${hourTileBackgroundStyle} ${cursorStyle}`}
      aria-checked={selected}
    >
      <MediumTypography
        className={`font-emphasize ${
          selected && !disabled ? 'text-slate-100' : 'text-black'
        }`}
      >
        {changeHourToDate(value)}
      </MediumTypography>
    </div>
  );
};

export default HourTile;
