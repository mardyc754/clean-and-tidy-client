import { useSummaryData } from '~/hooks/useSummaryData';

import { useOrderServiceFormStore } from '~/stores/orderServiceFormStore';

import { AddressDataField, SummaryView } from '~/components/organisms/layout';
import { Heading2 } from '~/components/atoms/typography/headings';

import { StepButtons } from '../form-fields';

interface SummaryFormProps {
  serviceName: string;
}

const SummaryForm = ({ serviceName }: SummaryFormProps) => {
  const { decreaseStep, currentStep } = useOrderServiceFormStore((state) => ({
    decreaseStep: state.decreaseStep,
    currentStep: state.currentStep
  }));

  const { summaryData, totalCost, contactDetails } =
    useSummaryData(serviceName);

  return (
    <form className="pt-16" onSubmit={(e) => e.preventDefault()}>
      <SummaryView
        data={summaryData}
        totalCost={totalCost}
        labelClasses="text-lg"
        valueClasses="text-2xl"
        contentDistribution="stretch"
        summaryTypographySize="large"
      />
      <div className="py-16">
        <Heading2>Address data</Heading2>
        <div className="pt-8">
          <AddressDataField data={contactDetails} />
        </div>
      </div>
      <StepButtons currentStep={currentStep} onDecreaseStep={decreaseStep} />
    </form>
  );
};

export default SummaryForm;
