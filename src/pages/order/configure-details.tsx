import { Heading1 } from '~/components/atoms/typography/headings';
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
        <div className="flex py-16">
          <Heading1>Configure Details</Heading1>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ConfigureDetails;
