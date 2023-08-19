import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';
import { contactDetailsIndicatorData } from './constants';

const ContactDetails = () => {
  return (
    <PageWrapper title="Configure order details">
      <div className="flex p-16">
        <MultiStepFormIndicator
          stepIndicatorData={contactDetailsIndicatorData}
        />
      </div>
    </PageWrapper>
  );
};

export default ContactDetails;
