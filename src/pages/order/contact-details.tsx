import { OrderCleaningFormPage } from '~/components/template';

import { contactDetailsIndicatorData } from './constants';

const ContactDetails = () => {
  return (
    <OrderCleaningFormPage
      title="Contact Details"
      heading="Contact Details"
      stepIndicatorData={contactDetailsIndicatorData}
      buttonData={[
        { name: 'Return', navigateOnClickTo: '/order-configure-details' },
        { name: 'Continue', navigateOnClickTo: '/order/summary' }
      ]}
    >
      <div />
    </OrderCleaningFormPage>
  );
};

export default ContactDetails;
