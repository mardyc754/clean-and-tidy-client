import { type DehydratedState } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { fetchUserData } from '~/server/prefetchUserData';

import type { AdminUser } from '~/schemas/api/auth';

import { useEmployeeListWithVisits } from '~/hooks/employee/useEmployeeList';
import { useEmployeeVisits } from '~/hooks/employee/useEmployeeVisits';

import { Spinner } from '~/components/molecules/status-indicators';
import {
  EmployeeReservationTable,
  EmployeeTable
} from '~/components/organisms/data-display';
import { AdminScheduler } from '~/components/organisms/scheduler';
import { ProfilePageTemplate } from '~/components/template';

import { getEventsFromEmployees } from '~/utils/scheduler';
import { isAdminUser } from '~/utils/userUtils';

export default function AdminProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { reservationList, isLoading } = useEmployeeVisits({
    employeeId: userData.id
  });
  const router = useRouter();

  const { defaultTab } = router.query;

  const { employeeList } = useEmployeeListWithVisits();

  return (
    <ProfilePageTemplate
      defaultTab={typeof defaultTab === 'string' ? defaultTab : undefined}
      userRole={userData.role}
      slots={[
        {
          name: 'Awaiting reservations',
          Content: () =>
            reservationList ? (
              <EmployeeReservationTable data={reservationList} />
            ) : (
              <></>
            )
        },
        {
          name: 'Employee visit calendar',
          Content: () =>
            !isLoading ? (
              <AdminScheduler
                className="w-full"
                employeeList={getEventsFromEmployees(employeeList ?? [])}
              />
            ) : (
              <Spinner caption="Loading events..." />
            )
        },
        {
          name: 'Employees',
          Content: () => <EmployeeTable data={employeeList ?? []} />
        }
      ]}
    />
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
