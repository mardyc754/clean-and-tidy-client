import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import type { GetServerSidePropsContext } from 'next';

import { reservation, user } from '~/constants/queryKeys';

import { fetcher } from '~/lib/axios';

import { getReservationByName } from '~/api/reservation';

import type { User } from '~/schemas/api/auth';

import { fetchUserQuery } from './prefetchUserData';

export const fetchReservationDetails = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();

  const req = context.req;
  const reservationName = context.params?.id;

  if (!reservationName) {
    return {
      dehydratedState: dehydrate(queryClient),
      reservationData: undefined,
      userData: undefined
    };
  }

  const userData = await fetchUserQuery(context, queryClient);

  let reservationData: User | undefined;

  try {
    reservationData = await queryClient.fetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: reservation.byName(reservationName as string),
      queryFn: async () => {
        const res = await getReservationByName(reservationName as string);

        return res;
      }
    });
  } catch (error) {
    console.error(error);
  }

  return {
    dehydratedState: dehydrate(queryClient),
    reservationData,
    userData
  };
};
