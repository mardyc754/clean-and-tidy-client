import { useMemo } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { DehydratedState } from '@tanstack/react-query';

import { fetchUserData } from '~/server/prefetchUserData';

import { getAllReservations } from '~/api/reservation';

import type { User } from '~/schemas/api/auth';
import type { Reservation } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';
import { Heading1, Heading2 } from '~/components/atoms/typography/headings';
import { PageWrapper } from '~/components/template';
import { Scheduler } from '~/components/organisms/scheduler';

import {
  getEventsFromReservation,
  getMaxEndDateFromReservations
} from '~/utils/scheduler';
import { daysBetween } from '~/utils/dateUtils';

const Profile = ({
  reservationList
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const reservationEvents = useMemo(() => {
    if (!reservationList) return [];

    return reservationList.flatMap((reservation) => {
      return getEventsFromReservation(reservation);
    });
  }, [reservationList]);

  const reservationsTimespan = useMemo(() => {
    if (!reservationList) return;

    return daysBetween(
      getMaxEndDateFromReservations(reservationList),
      new Date()
    );
  }, [reservationList]);

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
  const initialData = await fetchUserData(ctx);

  if (!initialData.userData || !('email' in initialData.userData)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const userEmail =
    'email' in initialData.userData ? initialData.userData.email : undefined;

  let reservationList: Reservation[] = [];
  try {
    if (userEmail) {
      reservationList = await getAllReservations({ bookerEmail: userEmail });
    }
  } catch (error) {
    return {
      props: {
        ...initialData,
        reservationList
      }
    };
  }

  return {
    props: {
      ...initialData,
      reservationList
    }
  };
}) satisfies GetServerSideProps<{
  reservationList: Reservation[] | undefined;
  dehydratedState: DehydratedState;
  userData: User | undefined;
}>;

export default Profile;
