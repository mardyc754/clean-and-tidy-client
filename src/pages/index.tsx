import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { DehydratedState } from '@tanstack/react-query';

import type { Service } from '~/schemas/api/services';

import { getAllServices } from '~/api/services';

import { prefetchUserData } from '~/server/prefetchUserData';

import { HeroSection } from '~/components/organisms/layout';
import { PageWrapper } from '~/components/template';

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
  const currentUserData = await prefetchUserData(ctx);

  let data: Service[] = [];
  try {
    data = await getAllServices({ primaryOnly: true });
  } catch (error) {
    return {
      props: {
        ...currentUserData,
        data: []
      }
    }; // temporary
  }

  return {
    props: {
      ...currentUserData,
      data
    }
  };
}) satisfies GetServerSideProps<{
  data: Service[];
  dehydratedState: DehydratedState;
}>;

export default Home;
