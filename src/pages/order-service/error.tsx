import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import { ResultPageWrapper } from '~/components/template';

const OrderErrorPage = () => {
  return (
    <ResultPageWrapper
      title="Something went wrong"
      heading="Something went wrong..."
      variant="error"
      icon={faCircleXmark}
      buttonData={[
        {
          name: 'Try Again',
          navigateOnClickTo: '/order/configure-details'
        },
        { name: 'Your Orders', navigateOnClickTo: '/user/profile' },
        { name: 'Return to Home Page', navigateOnClickTo: '/' }
      ]}
    >
      <p>Error when adding a new order service:</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab est iure
        voluptas. Sequi eum, distinctio dicta cupiditate consequatur fugiat
        dignissimos, sint totam exercitationem voluptatibus quidem est in
        debitis odit earum?
      </p>
    </ResultPageWrapper>
  );
};

export default OrderErrorPage;
