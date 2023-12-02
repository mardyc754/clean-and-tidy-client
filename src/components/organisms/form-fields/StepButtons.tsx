import clsx from 'clsx';

import { Button } from '~/components/atoms/buttons';
import { ErrorLabel } from '~/components/atoms/forms';

type StepButtonsProps = {
  cancelHref?: string;
  currentStep: number;
  submitErrorLabel?: string;
  onDecreaseStep: VoidFunction;
};

const StepButtons = ({
  cancelHref = '/',
  currentStep,
  submitErrorLabel,
  onDecreaseStep
}: StepButtonsProps) => {
  return (
    <div className="m-0 flex w-full justify-between">
      <div className={clsx('flex flex-col', 'pb-4', 'w-full')}>
        <Button
          href={currentStep === 0 ? cancelHref : undefined}
          onClick={(e) => {
            e.preventDefault();
            onDecreaseStep();
          }}
          // className="w-72 py-4"
          className="w-4/5"
        >
          Return
        </Button>
      </div>
      <div
        className={clsx(
          'flex w-full flex-col items-end',
          !submitErrorLabel && 'pb-4'
        )}
      >
        <Button
          type="submit"
          className="w-4/5"
          // className="w-72 py-4"
        >
          Continue
        </Button>
        {submitErrorLabel && <ErrorLabel>{submitErrorLabel}</ErrorLabel>}
      </div>
    </div>
  );
};

export default StepButtons;
