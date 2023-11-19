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
    <div className="m-0 flex justify-between">
      <Button
        href={currentStep === 0 ? cancelHref : undefined}
        onClick={(e) => {
          e.preventDefault();
          onDecreaseStep();
        }}
        className="w-72 py-4"
      >
        Return
      </Button>
      <div className={clsx('flex flex-col', !submitErrorLabel && 'pb-4')}>
        <Button type="submit" className="w-72 py-4">
          Continue
        </Button>
        {submitErrorLabel && <ErrorLabel>{submitErrorLabel}</ErrorLabel>}
      </div>
    </div>
  );
};

export default StepButtons;
