import { OrderCleaningFormPage } from '~/components/template';

import { contactDetailsIndicatorData } from './constants';
import { ContactDetailsForm } from '~/components/organisms/forms';

const ContactDetails = () => {
  return (
    <OrderCleaningFormPage
      title="Contact Details"
      heading="Contact Details"
      stepIndicatorData={contactDetailsIndicatorData}
      buttonData={[
        { name: 'Return', navigateOnClickTo: '/order/configure-details' },
        { name: 'Continue', navigateOnClickTo: '/order/summary' }
      ]}
    >
      <ContactDetailsForm />
    </OrderCleaningFormPage>
  );
};

export default ContactDetails;
