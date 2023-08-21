import { MediumTypography } from '../typography/regular-text';

type HourTileProps = {
  value: string;
  selected?: boolean;
  available?: boolean;
  disabled?: boolean;
  onSelect: VoidFunction;
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

  const onClick = () => {
    if (disabled || !available) {
      return;
    }

    onSelect();
  };

  return (
    <div
      onClick={onClick}
      className={`flex place-content-center  px-4 py-2 ${hourTileBackgroundStyle} ${cursorStyle}`}
    >
      <MediumTypography
        className={`font-emphasize ${
          selected && !disabled ? 'text-slate-100' : 'text-black'
        }`}
      >
        {value}
      </MediumTypography>
    </div>
  );
};

export default HourTile;
