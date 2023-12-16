import { type DehydratedState, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';

import { fetchUserData } from '~/server/prefetchUserData';

import { visit } from '~/constants/queryKeys';

import { getClientReservations } from '~/api/client';

import type { ClientUser } from '~/schemas/api/auth';

import { Spinner } from '~/components/molecules/status-indicators';
import { ReservationTable } from '~/components/organisms/data-display';
import { Scheduler } from '~/components/organisms/scheduler';
import { ProfilePageTemplate } from '~/components/template';

import { daysBetween } from '~/utils/dateUtils';
import {
  getEventsFromReservation,
  getMaxEndDateFromReservationVisits
} from '~/utils/scheduler';
import { isClientUser } from '~/utils/userUtils';

export default function ClientProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: reservationList, isLoading } = useQuery({
    queryKey: visit.client(userData.id),
    queryFn: () => getClientReservations(userData.id)
  });

  const visits = useMemo(() => {
    if (!reservationList) return [];

    return reservationList.flatMap((reservation) =>
      getEventsFromReservation(reservation)
    );
  }, [reservationList]);

  const reservationsTimeslot = useMemo(() => {
    if (!visits) return;

    return daysBetween(getMaxEndDateFromReservationVisits(visits), new Date());
  }, [visits]);

  return (
    <ProfilePageTemplate
      slots={[
        {
          name: 'Your Reservations',
          Content: () => <ReservationTable data={reservationList ?? []} />
        },
        {
          name: 'Visit calendar',
          Content: () =>
            !isLoading ? (
              <Scheduler
                className="w-full"
                events={visits}
                length={reservationsTimeslot}
              />
            ) : (
              <Spinner caption="Loading events..." />
            )
        }
      ]}
    />
  );
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

  return {
    props: {
      userData,
      dehydratedState
    }
  };
}) satisfies GetServerSideProps<{
  dehydratedState: DehydratedState;
  userData: ClientUser;
}>;

// if using the SSR for loading reservation data, replace the above with this:
// export const getServerSideProps = (async (ctx) => {
//   const initialData = await fetchUserData(ctx);

//   const { userData, dehydratedState } = initialData;

//   if (!isClientUser(userData)) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     };
//   }

//   let reservationList: Reservation[] = [];

//   try {
//     reservationList = await getClientReservations(userData.id);
//   } catch (error) {
//     return {
//       props: {
//         userData,
//         dehydratedState,
//         reservationList
//       }
//     };
//   }

//   return {
//     props: {
//       userData,
//       dehydratedState,
//       reservationList
//     }
//   };
// }) satisfies GetServerSideProps<{
//   reservationList: Reservation[] | undefined;
//   dehydratedState: DehydratedState;
//   userData: ClientUser;
// }>;
