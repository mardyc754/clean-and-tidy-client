import { type DehydratedState } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';

import { fetchUserData } from '~/server/prefetchUserData';

import type { AdminUser } from '~/schemas/api/auth';

import { Heading1 } from '~/components/atoms/typography/headings';
import { CreateEmployeeForm } from '~/components/organisms/forms';
import { PageWrapper } from '~/components/template';

import { isAdminUser } from '~/utils/userUtils';

const CreateEmployee = () => {
  return (
    <PageWrapper title="Create employee">
      <div className="px-8 py-16 md:px-16">
        <Heading1>Create employee</Heading1>
        <CreateEmployeeForm />
      </div>
    </PageWrapper>
  );
};

export default CreateEmployee;

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
