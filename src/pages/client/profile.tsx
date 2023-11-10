import { useMemo } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useQuery, type DehydratedState } from '@tanstack/react-query';

import { fetchUserData } from '~/server/prefetchUserData';

import { getClientReservations } from '~/api/client';

import type { ClientUser } from '~/schemas/api/auth';

import { visit } from '~/constants/queryKeys';

import { ProfilePageTemplate } from '~/components/template';
import { Heading2 } from '~/components/atoms/typography/headings';

import { getEventsFromReservation } from '~/utils/scheduler';
import { isClientUser } from '~/utils/userUtils';
import { ReservationField } from '~/components/organisms/button-fields';

export default function EmployeeProfile({
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
      <div className="flex flex-col items-baseline py-8">
        <Heading2>Your reservations</Heading2>
        <div className="flex flex-col space-y-4 pt-8">
          {reservationList?.map((reservation) => (
            <ReservationField
              data={reservation}
              key={`Reservation-${reservation.id}`}
            />
          ))}
        </div>
      </div>
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
