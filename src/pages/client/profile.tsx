import { type DehydratedState, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { fetchUserData } from '~/server/prefetchUserData';

import { visit } from '~/constants/queryKeys';

import { getClientReservations } from '~/api/client';

import type { ClientUser } from '~/schemas/api/auth';

import { Spinner } from '~/components/molecules/status-indicators';
import { ReservationTable } from '~/components/organisms/data-display';
import { ClientScheduler } from '~/components/organisms/scheduler';
import { ProfilePageTemplate } from '~/components/template';

import { isClientUser } from '~/utils/userUtils';

export default function ClientProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: reservationList, isLoading } = useQuery({
    queryKey: visit.client(userData.id),
    queryFn: () => getClientReservations(userData.id)
  });

  return (
    <ProfilePageTemplate
      userRole={userData.role}
      slots={[
        {
          name: 'Your Reservations',
          Content: () => <ReservationTable data={reservationList ?? []} />
        },
        {
          name: 'Visit calendar',
          Content: () =>
            !isLoading ? (
              <ClientScheduler reservationList={reservationList ?? []} />
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
