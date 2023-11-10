import { useMemo } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { DehydratedState } from '@tanstack/react-query';

import { fetchUserData } from '~/server/prefetchUserData';

import { getAllReservations } from '~/api/reservation';

import type { ClientUser } from '~/schemas/api/auth';
import type { Reservation } from '~/schemas/api/reservation';

import { ProfilePageTemplate } from '~/components/template';

import { getEventsFromReservation } from '~/utils/scheduler';
import { isClientUser } from '~/utils/userUtils';

export default function EmployeeProfile({
  reservationList,
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const reservationEvents = useMemo(() => {
    if (!reservationList) return [];

    return reservationList.flatMap((reservation) => {
      return getEventsFromReservation(reservation);
    });
  }, [reservationList]);

  return <ProfilePageTemplate visits={reservationEvents} userData={userData} />;
}

export const getServerSideProps = (async (ctx) => {
  const initialData = await fetchUserData(ctx);

  const { userData, dehydratedState } = initialData;

  if (!isClientUser(userData)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const userEmail = userData.email;

  let reservationList: Reservation[] = [];
  try {
    if (userEmail) {
      reservationList = await getAllReservations({ bookerEmail: userEmail });
    }
  } catch (error) {
    return {
      props: {
        userData,
        dehydratedState,
        reservationList
      }
    };
  }

  return {
    props: {
      userData,
      dehydratedState,
      reservationList
    }
  };
}) satisfies GetServerSideProps<{
  reservationList: Reservation[] | undefined;
  dehydratedState: DehydratedState;
  userData: ClientUser;
}>;
