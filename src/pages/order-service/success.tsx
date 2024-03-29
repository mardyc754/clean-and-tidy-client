import { useRouter } from 'next/router';

import { getServerSideUserData } from '~/server/prefetchUserData';

import { Button } from '~/components/atoms/buttons';
import { ResultPageWrapper } from '~/components/template';

const Success = () => {
  const router = useRouter();

  const { reservationName, email } = router.query;

  return (
    <ResultPageWrapper
      title="Order Created Successfully"
      heading="Reservation created successfully"
      variant="success"
      buttonData={[
        {
          name: 'Order another service',
          navigateOnClickTo: '/order-service'
        },
        // { name: 'Your Orders', navigateOnClickTo: '/user/profile' },
        { name: 'Return to Home Page', navigateOnClickTo: '/' }
      ]}
    >
      <p>The code of your reservation is</p>
      <div className="my-4 flex justify-center rounded-lg bg-cyan-500 p-4 text-sky-50">
        <p className="font-bold">{reservationName ?? ''}</p>
      </div>

      <div className="my-4 flex flex-col space-y-4 py-2">
        <p>Use this code to check the status of the reservation </p>
        <Button className="self-center" href="/check-reservation">
          Check reservation status
        </Button>
      </div>

      {/* The lines below may be hidden for logged in user 
      and the link to the profile page can be seen instead */}
      <div className="my-4 flex flex-col space-y-4 py-2">
        <p>
          Create an account to manage all of your reservations.
          <br />
          Your email address: <strong>{email ?? ''}</strong>
        </p>
        <Button className="self-center" href="register">
          Register
        </Button>
      </div>
    </ResultPageWrapper>
  );
};

export const getServerSideProps = getServerSideUserData;

export default Success;
