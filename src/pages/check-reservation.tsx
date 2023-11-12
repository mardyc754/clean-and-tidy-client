import { FormProvider } from 'react-hook-form';

import useReservationFinder from '~/hooks/reservation/useReservationFinder';

import { Button } from '~/components/atoms/buttons';
import { Heading1, Heading2 } from '~/components/atoms/typography/headings';
import { Textfield } from '~/components/molecules/form-fields';
import { ReservationDetails } from '~/components/organisms/data-display';
import { PageWrapper } from '~/components/template';
import {
  IconIndicator,
  Spinner
} from '~/components/molecules/status-indicators';
import { getServerSideUserData } from '~/server/prefetchUserData';

const CheckReservation = () => {
  const { data, error, status, methods, onSubmit, isLoading } =
    useReservationFinder('reservationName', {
      includeVisits: true,
      includeServices: true,
      includeAddress: true
    });

  const {
    formState: { errors }
  } = methods;

  return (
    <PageWrapper title="Check Reservation">
      <div className="p-16">
        <Heading1>Check reservation</Heading1>
        <div className="flex flex-col items-center py-8">
          <p className="my-4 font-emphasize text-2xl">
            {"Enter a reservation's name to check its details"}
          </p>
          <FormProvider {...methods}>
            <form
              className="flex w-full flex-col py-4 md:flex-row md:justify-center md:space-x-5"
              onSubmit={onSubmit}
            >
              <Textfield
                name="reservationName"
                label="Reservation name"
                wrapperProps="flex-1 md:max-w-[40vw]"
                errorLabel={errors.reservationName?.message}
              />
              <Button type="submit" className="self-center">
                Find reservation
              </Button>
            </form>
          </FormProvider>
        </div>
        {status === 'success' && data && (
          <>
            <Heading2>Reservation details</Heading2>
            <ReservationDetails data={data} />
          </>
        )}
        {status === 'pending' && isLoading && (
          <Spinner caption="Loading reservation data..." />
        )}
        {status === 'error' && (
          <IconIndicator
            variant="error"
            caption={error?.message ?? 'Reservation with given name not found'}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export const getServerSideProps = getServerSideUserData;

export default CheckReservation;
