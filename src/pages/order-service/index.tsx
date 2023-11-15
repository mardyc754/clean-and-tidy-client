import type { DehydratedState } from '@tanstack/react-query';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';

import { prefetchUserData } from '~/server/prefetchUserData';

import { getAllServices } from '~/api/services';

import type { Service } from '~/schemas/api/services';

import { Heading1 } from '~/components/atoms/typography/headings';
import { PageWrapper } from '~/components/template';

const OrderServiceHome = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <PageWrapper title="Check Reservation">
      <div className="p-16">
        <Heading1>Select service</Heading1>

        <div className="grid gap-x-8 sm:grid-cols-2 md:grid-cols-3">
          {/* <div> */}
          {data.map((service) => (
            <Link
              href={`/order-service/${service.id}`}
              key={`OrderService-${service.id}`}
            >
              <div className="my-8 flex items-center justify-between gap-16 rounded-xl bg-white p-8 shadow-md">
                <p className="font-emphasize text-xl">{service.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
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

export default OrderServiceHome;
