import { useMemo } from 'react';
import { useQuery, type DehydratedState } from '@tanstack/react-query';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import { fetchUserData } from '~/server/prefetchUserData';

import { visit } from '~/constants/queryKeys';

import { getEmployeeVisits } from '~/api/employee';

import type { EmployeeUser } from '~/schemas/api/auth';

import { ProfilePageTemplate } from '~/components/template';

import { getEventsFromVisits } from '~/utils/scheduler';
import { isEmployeeUser } from '~/utils/userUtils';

export default function EmployeeProfile({
  userData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: visitList, isLoading } = useQuery({
    queryKey: visit.employee(userData.id),
    queryFn: () => getEmployeeVisits(userData.id)
  });

  const visitEvents = useMemo(
    () => getEventsFromVisits(visitList ?? []),
    [visitList]
  );

  return (
    <ProfilePageTemplate
      visits={visitEvents}
      userData={userData}
      isLoadingEvents={isLoading}
    ></ProfilePageTemplate>
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
