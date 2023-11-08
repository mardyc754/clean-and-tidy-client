import { useMemo, useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { DehydratedState } from '@tanstack/react-query';
import { prefetchUserData } from '~/server/prefetchUserData';

import { Button } from '~/components/atoms/buttons';
import { Heading1, Heading2 } from '~/components/atoms/typography/headings';
import { Dropdown } from '~/components/molecules/form-fields';
import { BookingPreview } from '~/components/molecules/layout';
import { PageWrapper } from '~/components/template';
import { getClientReservations } from '~/api/client';
import { ClientWithReservations } from '~/schemas/api/client';
import { Scheduler } from '~/components/organisms/scheduler';
import {
  getEventsFromReservation,
  getMaxEndDateFromReservations
} from '~/utils/scheduler';
import { daysBetween } from '~/utils/dateUtils';

const exampleSingleReservationData = {
  id: 1, // or UUID
  name: 'Home Cleaning',
  duration: 2,
  date: new Date(2023, 7, 17, 8)
};

const exampleOptions = [
  { id: 1, name: 'Upcoming' },
  { id: 2, name: 'Recent' }
];

const YourProfile = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedValue, setSelectedValue] = useState(exampleOptions[0]);

  const reservationEvents = useMemo(() => {
    if (!data) return [];

    return data.reservations.flatMap((reservation) => {
      return getEventsFromReservation(reservation);
    });
  }, []);

  const reservationsTimespan = useMemo(() => {
    if (!data) return;
    return daysBetween(
      getMaxEndDateFromReservations(data.reservations),
      new Date()
    );
  }, []);

  return (
    <PageWrapper title="Your profile">
      <div className="p-16">
        <Heading1>Your profile</Heading1>

        <div className="my-8 flex items-center gap-16 rounded-xl bg-white p-12 shadow-md">
          {/* <Avatar size="large" /> */}
          <div className="flex gap-8 font-link">
            <p className="text-4xl">John Doe</p>
            <Button>Edit profile</Button>
          </div>
        </div>
        <div className="flex flex-col items-baseline py-8">
          <Heading2>Your Reservations</Heading2>
          {/* <div className="flex items-center space-x-2">
            <p>Show:</p>
            <Dropdown
              value={selectedValue}
              options={exampleOptions}
              onChange={setSelectedValue}
              className="w-40"
            />
          </div> */}
          <div className="flex w-full items-center justify-center py-8">
            <Scheduler
              className="w-full"
              events={reservationEvents}
              length={reservationsTimespan}
            />
          </div>
        </div>
        {/* <div className="my-8 space-y-5">
          <BookingPreview data={exampleSingleReservationData} />
          <BookingPreview data={exampleSingleReservationData} />
          <BookingPreview data={exampleSingleReservationData} />
          <BookingPreview data={exampleSingleReservationData} />
        </div> */}
      </div>
    </PageWrapper>
  );
};

export const getServerSideProps = (async (ctx) => {
  const currentUserData = await prefetchUserData(ctx);

  let data: ClientWithReservations | null = null;
  try {
    data = await getClientReservations(3);
  } catch (error) {
    return {
      props: {
        ...currentUserData,
        data: null
      }
    };
  }

  return {
    props: {
      ...currentUserData,
      data
    }
  };
}) satisfies GetServerSideProps<{
  data: ClientWithReservations | null;
  dehydratedState: DehydratedState;
}>;

export default YourProfile;
