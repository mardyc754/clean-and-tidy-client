import { FormProvider } from 'react-hook-form';

import { Button } from '~/components/atoms/buttons';
import { Heading1 } from '~/components/atoms/typography/headings';
import { Textfield } from '~/components/molecules/form-fields';
import { ReservationDetails } from '~/components/organisms/data-display';
import { PageWrapper } from '~/components/template';
import useReservationFinder from '~/hooks/reservation/useReservation';
import { Spinner } from '~/components/atoms/spinners';

const CheckReservation = () => {
  const { data, isLoading, methods, onSubmit } = useReservationFinder(
    'reservationName',
    {
      includeVisits: true,
      includeServices: true,
      includeAddress: true
    }
  );

  return (
    <PageWrapper title="Check Reservation">
      <div className="p-16">
        <Heading1>Check reservation</Heading1>
        <div className="flex flex-col items-center py-8">
          <p className="my-4 font-emphasize text-2xl">
            {"Enter a reservation's name to check its status"}
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
              />
              <Button type="submit" className="self-center">
                Find reservation
              </Button>
            </form>
          </FormProvider>
        </div>
        {data && <ReservationDetails data={data} />}
        {isLoading && <Spinner caption="Loading reservation data..." />}
      </div>
    </PageWrapper>
  );
};

export default CheckReservation;
