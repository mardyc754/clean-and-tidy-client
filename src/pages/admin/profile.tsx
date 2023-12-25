import { type DehydratedState } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { fetchUserData } from '~/server/prefetchUserData';

import type { AdminUser } from '~/schemas/api/auth';

import { useServices } from '~/hooks/adminForms/useServices';
import { useEmployeeListWithVisits } from '~/hooks/employee/useEmployeeList';
import { useEmployeeVisits } from '~/hooks/employee/useEmployeeVisits';

import { Spinner } from '~/components/molecules/status-indicators';
import { AdminScheduler } from '~/components/organisms/scheduler';
import {
  EmployeeReservationTable,
  EmployeeTable,
  ServiceTable
} from '~/components/organisms/tables';
import { ProfilePageTemplate } from '~/components/template';

import { getEventsForAdmin } from '~/utils/scheduler';
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

  const { services } = useServices();

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
                employeeList={getEventsForAdmin(employeeList ?? [])}
              />
            ) : (
              <Spinner caption="Loading events..." />
            )
        },
        {
          name: 'Employees',
          Content: () => <EmployeeTable data={employeeList ?? []} />
        },
        {
          name: 'Services',
          Content: () => <ServiceTable data={services ?? []} />
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
