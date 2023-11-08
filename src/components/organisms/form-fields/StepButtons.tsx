import { Button } from '~/components/atoms/buttons';

type StepButtonsProps = {
  cancelHref?: string;
  currentStep: number;
  onDecreaseStep: VoidFunction;
};

const StepButtons = ({
  cancelHref = '/',
  currentStep,
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
      <Button type="submit" className="w-72 py-4">
        Continue
      </Button>
    </div>
  );
};

export default StepButtons;
