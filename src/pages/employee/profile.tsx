import { type DehydratedState } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { fetchUserData } from '~/server/prefetchUserData';

import type { RegularEmployeeUser } from '~/schemas/api/auth';

import { useEmployeeVisits } from '~/hooks/employee/useEmployeeVisits';

import { ReservationToConfirmList } from '~/components/organisms/lists';
import { ProfilePageTemplate } from '~/components/template';

import { isRegularEmployeeUser } from '~/utils/userUtils';

export default function EmployeeProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { visitEvents, reservationList, isLoading } = useEmployeeVisits({
    employeeId: userData.id
  });

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

  if (!isRegularEmployeeUser(userData)) {
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
  userData: RegularEmployeeUser;
}>;
