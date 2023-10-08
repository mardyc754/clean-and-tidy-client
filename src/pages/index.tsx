import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { Service } from '~/api/schemas/services';

import { getAllServices } from '~/api/services';
import type { ErrorResponseData } from '~/api/utils';

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

export const getServerSideProps = (async () => {
  const data = await getAllServices({ primaryOnly: true });
  if ('hasError' in data) {
    return { props: { data: [] } }; // temporary
  }

  return { props: { data } };
}) satisfies GetServerSideProps<{ data: Service[] | ErrorResponseData }>;

export default Home;
