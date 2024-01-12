import type { StepIndicator } from '~/types/forms';

import { FormStepIndicator } from '../atoms/layout';

type ThreeStepIndicatorProps = {
  stepIndicatorData: StepIndicator[];
};

const MultiStepFormIndicator = ({
  stepIndicatorData
}: ThreeStepIndicatorProps) => {
  return (
    <div className="flex w-full flex-col justify-between md:flex-row">
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
