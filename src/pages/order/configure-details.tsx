import { Heading1 } from '~/components/atoms/typography/headings';
import { CleaningDetailsForm } from '~/components/organisms/forms';
import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';

import { configureDetailsIndicatorData } from './constants';

const ConfigureDetails = () => {
  return (
    <PageWrapper title="Configure order details">
      <div className="flex flex-col p-16">
        <MultiStepFormIndicator
          stepIndicatorData={configureDetailsIndicatorData}
        />
        <div className="flex flex-col py-16">
          <Heading1>Configure Details</Heading1>
          <CleaningDetailsForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ConfigureDetails;
