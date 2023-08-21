import { HourTile } from '~/components/atoms/forms';

type HourSelectionProps = {
  className?: string;
};

const HourSelection = ({ className = '' }: HourSelectionProps) => {
  return (
    // it will be grid probably with gaps
    <div className={`grid grid-cols-2 grid-rows-6 gap-1 ${className}`}>
      <HourTile value="8:00" />
      <HourTile value="12:00" />
    </div>
  );
};

export default HourSelection;
