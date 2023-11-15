import { type DehydratedState, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';

import { fetchUserData } from '~/server/prefetchUserData';

import { reservation, visit } from '~/constants/queryKeys';

import { getEmployeeReservations, getEmployeeVisits } from '~/api/employee';

import type { EmployeeUser } from '~/schemas/api/auth';

import { ReservationToConfirmList } from '~/components/organisms/lists';
import { ProfilePageTemplate } from '~/components/template';

import { getEventsFromVisits } from '~/utils/scheduler';
import { isEmployeeUser } from '~/utils/userUtils';

import { Status } from '~/types/enums';

export default function EmployeeProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: visitList, isLoading } = useQuery({
    queryKey: visit.employee(userData.id),
    queryFn: () => getEmployeeVisits(userData.id)
  });

  const { data: reservationList, isLoading: isLoadingReservations } = useQuery({
    queryKey: reservation.employee(userData.id),
    queryFn: () =>
      getEmployeeReservations(userData.id, { status: Status.TO_BE_CONFIRMED })
  });

  const visitEvents = useMemo(
    () => getEventsFromVisits(visitList?.map(({ visit }) => visit) ?? []),
    [visitList]
  );
  return (
    <ProfilePageTemplate
      visits={visitEvents}
      userData={userData}
      isLoadingEvents={isLoading}
    >
      {reservationList && <ReservationToConfirmList data={reservationList} />}
    </ProfilePageTemplate>
  );
}

export const getServerSideProps = (async (ctx) => {
  const initialData = await fetchUserData(ctx);

  const { userData, dehydratedState } = initialData;

  if (!isEmployeeUser(userData)) {
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
  userData: EmployeeUser;
}>;
