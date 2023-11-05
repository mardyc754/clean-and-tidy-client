import { useRouter } from 'next/router';

import { ResultPageWrapper } from '~/components/template';

const OrderErrorPage = () => {
  const router = useRouter();

  return (
    <ResultPageWrapper
      title="Something went wrong"
      heading="Something went wrong..."
      variant="error"
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
        <span className="font-emphasize">Error message:</span>{' '}
        {router.query.message}
      </p>
    </ResultPageWrapper>
  );
};

export default OrderErrorPage;
