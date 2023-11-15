import type { GetStaticProps, InferGetServerSidePropsType } from 'next';

import { getAllReservations, getReservationByName } from '~/api/reservation';

import type { Reservation } from '~/schemas/api/reservation';

import { useAuth } from '~/hooks/auth/useAuth';

import { Heading1 } from '~/components/atoms/typography/headings';
import { ReservationDetails } from '~/components/organisms/data-display';
import { PageWrapper } from '~/components/template';

export default function ReservationPage({
  data
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const { hasAccess } = useAuth(
    (user) => user.email === data?.bookerEmail,
    true
  );

  return (
    <PageWrapper title="Reservation details">
      <div className="p-16">
        <Heading1>Reservation details</Heading1>
        <ReservationDetails data={data} manageable={hasAccess} />
      </div>
    </PageWrapper>
  );
}

// export const getServerSideProps = (async (ctx) => {
//   const initialData = await fetchUserData(ctx);

//   const { userData, dehydratedState } = initialData;

//   if (!isClientUser(userData)) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     };
//   }

//   return {
//     props: {
//       userData,
//       dehydratedState
//     }
//   };
// }) satisfies GetServerSideProps<{
//   dehydratedState: DehydratedState;
//   userData: ClientUser;
// }>;

export const getStaticPaths = async () => {
  let data: Reservation[] = [];
  try {
    data = await getAllReservations();
  } catch (error) {
    return { paths: [], fallback: false }; // temporary
  }

  return {
    paths: data.map(({ name }) => ({
      params: {
        id: `${name}`
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

  let data: Reservation | null = null;

  try {
    data = await getReservationByName(params.id as string, {
      includeVisits: true,
      includeServices: true,
      includeAddress: true
    });
  } catch (error) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      data
    }
  };
}) satisfies GetStaticProps<{ data: Reservation | null }>;
