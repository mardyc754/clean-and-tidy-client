import { CleaningDetailsForm } from '~/components/organisms/forms';
import { OrderCleaningFormPage } from '~/components/template';

import { configureDetailsIndicatorData } from './constants';

const ConfigureDetails = () => {
  return (
    <OrderCleaningFormPage
      title="Configure Order Details"
      heading="Configure Details"
      stepIndicatorData={configureDetailsIndicatorData}
      buttonData={[
        { name: 'Return', navigateOnClickTo: '/' },
        { name: 'Continue', navigateOnClickTo: '/order/contact-details' }
      ]}
    >
      <CleaningDetailsForm />
    </OrderCleaningFormPage>
  );
};

export default ConfigureDetails;
