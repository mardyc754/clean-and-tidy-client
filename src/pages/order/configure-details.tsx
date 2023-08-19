import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';
import { configureDetailsIndicatorData } from './constants';

const ConfigureDetails = () => {
  return (
    <PageWrapper title="Configure order details">
      <div className="flex p-16">
        <MultiStepFormIndicator
          stepIndicatorData={configureDetailsIndicatorData}
        />
      </div>
    </PageWrapper>
  );
};

export default ConfigureDetails;
