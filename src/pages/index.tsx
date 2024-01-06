import type { DehydratedState } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getIsSsrMobile } from '~/server/getIsMobile';
import { fetchUserData } from '~/server/prefetchUserData';

import { getAllServices } from '~/api/services';

import type { Service } from '~/schemas/api/services';

import { HeroSection } from '~/components/organisms/layout';
import { PageWrapper } from '~/components/template';

import { isAdminUser, isRegularEmployeeUser } from '~/utils/userUtils';

const Home = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <PageWrapper title="Home page">
      <HeroSection services={data} />
    </PageWrapper>
  );
};

export const getServerSideProps = (async (ctx) => {
  const fetchedUser = await fetchUserData(ctx);
  const isSsrMobile = getIsSsrMobile(ctx);

  if (isRegularEmployeeUser(fetchedUser.userData)) {
    return {
      redirect: {
        destination: '/employee/profile',
        permanent: false
      }
    };
  }

  if (isAdminUser(fetchedUser.userData)) {
    return {
      redirect: {
        destination: '/admin/profile',
        permanent: false
      }
    };
  }

  let data: Service[] = [];
  try {
    data = await getAllServices({ primaryOnly: true });
  } catch (error) {
    return {
      props: {
        ...fetchedUser,
        isSsrMobile,
        data: []
      }
    }; // temporary
  }

  return {
    props: {
      ...fetchedUser,
      data,
      isSsrMobile
    }
  };
}) satisfies GetServerSideProps<{
  data: Service[];
  dehydratedState: DehydratedState;
  isSsrMobile: boolean;
}>;

export default Home;
