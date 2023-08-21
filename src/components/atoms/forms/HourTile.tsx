import { MediumTypography } from '../typography/regular-text';

type HourTileProps = {
  value: string;
};

/**
 * Simple hour tile component
 * It probably will be using dayjs: https://www.npmjs.com/package/dayjs
 */
const HourTile = ({ value }: HourTileProps) => {
  // bg-slate-400 - unavailable
  // bg-cyan-100 - available
  // bg-cyan-300 - currently selected - font white
  return (
    <div className="flex place-content-center bg-slate-400 px-4 py-2">
      <MediumTypography className="font-emphasize">{value}</MediumTypography>
    </div>
  );
};

export default HourTile;
