import { type DehydratedState } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';

import { fetchUserData } from '~/server/prefetchUserData';

import type { AdminUser } from '~/schemas/api/auth';

import { useEmployeeListWithVisits } from '~/hooks/employee/useEmployeeList';
import { useEmployeeVisits } from '~/hooks/employee/useEmployeeVisits';

import { Spinner } from '~/components/molecules/status-indicators';
import { EmployeeTable } from '~/components/organisms/data-display';
import { ReservationToConfirmList } from '~/components/organisms/lists';
import { Scheduler } from '~/components/organisms/scheduler';
import { ProfilePageTemplate } from '~/components/template';

import { daysBetween } from '~/utils/dateUtils';
import {
  getEventsFromEmployees,
  getMaxEndDateFromReservationVisits
} from '~/utils/scheduler';
import { isAdminUser } from '~/utils/userUtils';

export default function AdminProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { reservationList, isLoading } = useEmployeeVisits({
    employeeId: userData.id
  });

  const { employeeList } = useEmployeeListWithVisits();

  const reservationsTimeslot = useMemo(() => {
    const visits = getEventsFromEmployees(employeeList ?? []);
    if (!visits) return;

    return daysBetween(getMaxEndDateFromReservationVisits(visits), new Date());
  }, [employeeList]);

  return (
    <ProfilePageTemplate
      visits={getEventsFromEmployees(employeeList ?? [])}
      userData={userData}
      slots={[
        {
          name: 'Awaiting reservations',
          Content: () =>
            reservationList ? (
              <ReservationToConfirmList data={reservationList ?? []} />
            ) : (
              <></>
            )
        },
        {
          name: 'Employee visit calendar',
          Content: () =>
            !isLoading ? (
              <Scheduler
                className="w-full"
                events={getEventsFromEmployees(employeeList ?? [])}
                length={reservationsTimeslot}
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
    ></ProfilePageTemplate>
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
