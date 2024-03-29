import { type DehydratedState } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';

import { fetchUserData } from '~/server/prefetchUserData';

import type { RegularEmployeeUser } from '~/schemas/api/auth';

import { useEmployeeVisits } from '~/hooks/employee/useEmployeeVisits';

import { Spinner } from '~/components/molecules/status-indicators';
import { Scheduler } from '~/components/organisms/scheduler';
import { EmployeeReservationTable } from '~/components/organisms/tables';
import { ProfilePageTemplate } from '~/components/template';

import { daysBetween } from '~/utils/dateUtils';
import {
  generateIscFileForEmployee,
  getMaxEndDateFromReservationVisits
} from '~/utils/scheduler';
import { isRegularEmployeeUser } from '~/utils/userUtils';

export default function EmployeeProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { visitEvents, reservationList, isLoading, visitList } =
    useEmployeeVisits({
      employeeId: userData.id
    });

  const reservationsTimeslot = useMemo(() => {
    if (!visitEvents) return;

    return daysBetween(
      getMaxEndDateFromReservationVisits(visitEvents),
      new Date()
    );
  }, [visitEvents]);

  return (
    <ProfilePageTemplate
      userRole={userData.role}
      slots={[
        {
          name: 'Awaiting reservations',
          content: () =>
            reservationList ? (
              <EmployeeReservationTable data={reservationList} />
            ) : (
              <></>
            )
        },
        {
          name: 'Visit calendar',
          content: () =>
            !isLoading ? (
              <Scheduler
                userRole="employee"
                onClickDownloadIcs={() =>
                  generateIscFileForEmployee(visitList ?? [], userData)
                }
                className="w-full"
                events={visitEvents}
                length={reservationsTimeslot}
              />
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
