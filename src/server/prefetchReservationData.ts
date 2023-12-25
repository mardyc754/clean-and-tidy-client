import { QueryClient, dehydrate } from '@tanstack/react-query';

import { reservation } from '~/constants/queryKeys';

import { getReservationByName } from '~/api/reservation';

import type { ReservationWithExtendedVisits } from '~/schemas/api/reservation';

export const fetchReservationDetails = async (reservationName: string) => {
  const queryClient = new QueryClient();

  if (!reservationName) {
    return {
      dehydratedState: dehydrate(queryClient),
      userData: undefined
    };
  }

  let reservationData: ReservationWithExtendedVisits | undefined;

  try {
    reservationData = await queryClient.fetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: reservation.byName(reservationName),
      queryFn: async () => {
        const res = await getReservationByName(reservationName);

        return res;
      }
    });
  } catch (error) {
    console.error(error);
  }

  return {
    dehydratedState: dehydrate(queryClient),
    reservationData
  };
};
