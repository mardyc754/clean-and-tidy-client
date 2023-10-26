import type { Dispatch, SetStateAction } from 'react';

import { Button } from '~/components/atoms/buttons';

type StepButtonsProps = {
  cancelHref: string;
  currentStep: number;
  maxStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const StepButtons = ({
  cancelHref,
  currentStep,
  maxStep,
  setCurrentStep
}: StepButtonsProps) => {
  return (
    <div className="m-0 flex w-full justify-between">
      <Button
        href={currentStep === 0 ? cancelHref : undefined}
        onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))}
        className="w-72 py-4"
      >
        Return
      </Button>
      <Button
        onClick={() =>
          setCurrentStep((prev) => (prev < maxStep ? prev + 1 : prev))
        }
        className="w-72 py-4"
      >
        Continue
      </Button>
    </div>
  );
};

export default StepButtons;
