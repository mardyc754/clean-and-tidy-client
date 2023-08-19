import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';
import { summaryIndicatorData } from './constants';

const Summary = () => {
  return (
    <PageWrapper title="Configure order details">
      <div className="flex p-16">
        <MultiStepFormIndicator stepIndicatorData={summaryIndicatorData} />
      </div>
    </PageWrapper>
  );
};

export default Summary;
