import { useOrderServiceFormNavigation } from '~/hooks/orderServiceForm/useOrderServiceFormNavigation';
import { useOrderServiceFormSubmit } from '~/hooks/orderServiceForm/useOrderServiceFormSubmit';
import { useSummaryData } from '~/hooks/useSummaryData';

import { Heading2 } from '~/components/atoms/typography/headings';
import { AddressDataField, SummaryView } from '~/components/organisms/layout';

import { StepButtons } from '../form-fields';

interface SummaryFormProps {
  serviceName: string;
}

const SummaryForm = ({ serviceName }: SummaryFormProps) => {
  const { onChangeStep } = useOrderServiceFormNavigation();
  const { onSubmit } = useOrderServiceFormSubmit();

  const { summaryData, totalCost, contactDetails, extraInfo } =
    useSummaryData(serviceName);

  return (
    <form className="pt-16" onSubmit={onSubmit}>
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
      {extraInfo && (
        <div className="py-16">
          <Heading2>Extra info</Heading2>
          <div className="pt-8">
            <p>{extraInfo}</p>
          </div>
        </div>
      )}
      <StepButtons
        currentStep={3}
        onDecreaseStep={async () => await onChangeStep(2)}
      />
    </form>
  );
};

export default SummaryForm;
