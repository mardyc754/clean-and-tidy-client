import { faGrinBeam } from '@fortawesome/free-regular-svg-icons';
import { ResultPageWrapper } from '~/components/template';

const Success = () => {
  return (
    <ResultPageWrapper
      title="Order Created Successfully"
      heading="Success!"
      icon={faGrinBeam}
      buttonData={[
        {
          name: 'Order another service',
          navigateOnClickTo: '/order/configure-details'
        },
        { name: 'Your Orders', navigateOnClickTo: '/your-profile' },
        { name: 'Return to Home Page', navigateOnClickTo: '/' }
      ]}
    >
      <p>Your order was created successfully!</p>
    </ResultPageWrapper>
  );
};

export default Success;
