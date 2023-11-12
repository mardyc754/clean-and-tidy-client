import clsx from 'clsx';

import Button, { type ButtonProps } from '~/components/atoms/buttons/Button';

interface SectionWithButtonProps {
  wrapperClasses?: string;
  label: string;
  buttonProps: ButtonProps & { content: string };
}

const SectionWithButton = ({
  wrapperClasses,
  label,
  buttonProps
}: SectionWithButtonProps) => {
  const { content: buttonContent, ...rest } = buttonProps;
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-between space-y-4 rounded-xl bg-white p-8 shadow-md',
        'md:flex-row md:space-y-0',
        wrapperClasses
      )}
    >
      <p className="font-semibold">{label}</p>
      <div className="flex space-x-4">
        <Button {...rest}>{buttonContent}</Button>
        {/* <Button>Manage</Button> */}
      </div>
      {/* <p className="font-semibold">
        {getWeekDayNameWithFrequencyAndDate(
          data.visits?.[0]?.startDate,
          data.frequency
        )}
      </p> */}
    </div>
  );
};

export default SectionWithButton;
