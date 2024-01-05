import type { GetStaticProps, InferGetServerSidePropsType } from 'next';

import { fetchEmployeeData } from '~/server/prefetchEmployeeData';

import { getAllEmployees } from '~/api/employee';

import type { Employee, EmployeeWithServices } from '~/schemas/api/employee';

import { useServices } from '~/hooks/adminForms/useServices';
import { useAuth } from '~/hooks/auth/useAuth';

import { Heading1 } from '~/components/atoms/typography/headings';
import { ChangeEmployeeDataForm } from '~/components/organisms/forms';
import { PageWrapper } from '~/components/template';

import { isAdminUser } from '~/utils/userUtils';

export default function ChangeEmployeeData({
  data
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  useAuth((user) => isAdminUser(user), true);

  const { services } = useServices();

  return (
    <PageWrapper title="Change Employee Data">
      <div className="p-16">
        <Heading1>Change Employee Data</Heading1>
        {data && services && (
          <ChangeEmployeeDataForm employeeData={data} services={services} />
        )}
      </div>
    </PageWrapper>
  );
}

export const getStaticPaths = async () => {
  let data: Employee[] = [];
  try {
    data = await getAllEmployees();
  } catch (error) {
    return { paths: [], fallback: false }; // temporary
  }

  return {
    paths: data.map(({ id }) => ({
      params: {
        id: `${id}`
      }
    })),
    fallback: true
  };
};

export const getStaticProps = (async ({ params }) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const { employeeData } = await fetchEmployeeData(params.id as string);

  if (!employeeData) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: employeeData
    }
  };
}) satisfies GetStaticProps<{ data: EmployeeWithServices }>;
