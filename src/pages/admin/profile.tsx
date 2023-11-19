import { type DehydratedState, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { fetchUserData } from '~/server/prefetchUserData';

import type { AdminUser } from '~/schemas/api/auth';

import { useEmployeeList } from '~/hooks/employee/useEmployeeList';
import { useEmployeeVisits } from '~/hooks/employee/useEmployeeVisits';

import { EmployeeTable } from '~/components/organisms/data-display';
import { EmployeeList } from '~/components/organisms/lists';
import { ReservationToConfirmList } from '~/components/organisms/lists';
import { ProfilePageTemplate } from '~/components/template';

import { isAdminUser } from '~/utils/userUtils';

export default function AdminProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { visitEvents, reservationList, isLoading } = useEmployeeVisits({
    employeeId: userData.id
  });

  const { employeeList } = useEmployeeList();

  return (
    <ProfilePageTemplate
      visits={visitEvents}
      userData={userData}
      isLoadingEvents={isLoading}
    >
      {/* {employeeList && <EmployeeList data={employeeList} />} */}
      {employeeList && <EmployeeTable data={employeeList} />}
      {reservationList && <ReservationToConfirmList data={reservationList} />}
    </ProfilePageTemplate>
  );
}

export const getServerSideProps = (async (ctx) => {
  const initialData = await fetchUserData(ctx);

  const { userData, dehydratedState } = initialData;

  if (!isAdminUser(userData)) {
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
  userData: AdminUser;
}>;
