import { type DehydratedState, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';

import { fetchUserData } from '~/server/prefetchUserData';

import { visit } from '~/constants/queryKeys';

import { getClientReservations } from '~/api/client';

import type { ClientUser } from '~/schemas/api/auth';

import { DataTable } from '~/components/organisms/data-display';
import { ReservationList } from '~/components/organisms/lists';
import { ProfilePageTemplate } from '~/components/template';

import { getEventsFromReservation } from '~/utils/scheduler';
import { isClientUser } from '~/utils/userUtils';

export default function ClientProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: reservationList, isLoading } = useQuery({
    queryKey: visit.client(userData.id),
    queryFn: () => getClientReservations(userData.id)
  });

  const visitEvents = useMemo(() => {
    if (!reservationList) return [];

    return reservationList.flatMap((reservation) =>
      getEventsFromReservation(reservation)
    );
  }, [reservationList]);

  return (
    <ProfilePageTemplate
      visits={visitEvents}
      userData={userData}
      isLoadingEvents={isLoading}
    >
      <DataTable />
      <ReservationList data={reservationList ?? []} />
    </ProfilePageTemplate>
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
