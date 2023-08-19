import { FormStepIndicator } from '../atoms/layout';

type StepIndicator = {
  name: string;
  rectangleColorClass: string;
  outerTriangleColorClass?: string;
  innerTriangleColorClass?: string;
};

type ThreeStepIndicatorProps = {
  stepIndicatorData: StepIndicator[];
};

const MultiStepFormIndicator = ({
  stepIndicatorData
}: ThreeStepIndicatorProps) => {
  return (
    <div className="flex w-full justify-between">
      {stepIndicatorData.map(
        ({
          name,
          rectangleColorClass,
          outerTriangleColorClass,
          innerTriangleColorClass
        }) => (
          <FormStepIndicator
            key={name}
            stepName={name}
            rectangleColorClass={rectangleColorClass}
            outerTriangleColorClass={outerTriangleColorClass}
            innerTriangleColorClass={innerTriangleColorClass}
          />
        )
      )}
    </div>
  );
};

export default MultiStepFormIndicator;
