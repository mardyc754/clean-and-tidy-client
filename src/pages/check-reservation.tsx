import { useState } from 'react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { getRecurringReservationByName } from '~/api/reservation';
import { Button } from '~/components/atoms/buttons';
import { Heading1 } from '~/components/atoms/typography/headings';
import { Textfield } from '~/components/molecules/form-fields';
import { ReservationDetails } from '~/components/organisms/data-display';

import { PageWrapper } from '~/components/template';
import type { RecurringReservationWithReservations } from '~/schemas/api/reservation';

type CheckReservationData = { reservationName: string };

const CheckReservation = () => {
  const [recurringReservationData, setRecurringReservationData] =
    useState<RecurringReservationWithReservations | null>(null);

  const methods = useForm<CheckReservationData>();
  const onSubmit: SubmitHandler<CheckReservationData> = async (
    { reservationName },
    e
  ) => {
    e?.preventDefault();
    const data = await getRecurringReservationByName(reservationName);

    if ('hasError' in data) {
      toast.error(data.message, { position: 'bottom-center' });
      return;
    }

    setRecurringReservationData(data);
  };

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
              onSubmit={methods.handleSubmit(onSubmit)}
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
        {recurringReservationData && (
          <ReservationDetails data={recurringReservationData} />
        )}
      </div>
    </PageWrapper>
  );
};

// export const getServerSideProps = (async () => {
//   const data = await getAllServices({ primaryOnly: true });
//   if ('hasError' in data) {
//     return { props: { data: [] } }; // temporary
//   }

//   return { props: { data } };
// }) satisfies GetServerSideProps<{ data: Service[] | BackendBasicErrorData }>;

export default CheckReservation;
