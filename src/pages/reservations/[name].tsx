import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { fetchReservationDetails } from '~/server/prefetchReservationData';

import { getAllReservations } from '~/api/reservation';

import type {
  Reservation,
  ReservationWithExtendedVisits
} from '~/schemas/api/reservation';

import { useAuth } from '~/hooks/auth/useAuth';
import { useReservation } from '~/hooks/reservation/useReservation';

import { Heading1 } from '~/components/atoms/typography/headings';
import { ReservationDetails } from '~/components/organisms/tables';
import { PageWrapper } from '~/components/template';

export default function ReservationPage({
  reservationData
}: // }: InferGetServerSidePropsType<typeof getStaticProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useReservation(reservationData?.name);

  const { hasAccess } = useAuth(
    (user) =>
      !!reservationData.bookerEmail &&
      user.email === reservationData.bookerEmail
  );

  return (
    <PageWrapper title="Reservation details">
      <div className="p-16">
        <Heading1>Reservation details</Heading1>
        <ReservationDetails
          data={data ?? reservationData}
          manageable={hasAccess}
        />
      </div>
    </PageWrapper>
  );
}

// export const getServerSideProps = (async (ctx) => {
//   const initialData = await fetchReservationDetails(ctx);

//   const { userData, dehydratedState, reservationData } = initialData;

//   if (!isClientUser(userData)) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     };
//   }

//   if (!reservationData || Object.keys(reservationData).length === 0) {
//     return {
//       notFound: true
//     };
//   }

//   return {
//     props: {
//       userData,
//       dehydratedState,
//       reservationData: reservationData as ReservationWithExtendedVisits
//     }
//   };
// }) satisfies GetServerSideProps<{
//   dehydratedState: DehydratedState;
//   userData: ClientUser;
//   reservationData: ReservationWithExtendedVisits;
// }>;

export const getStaticPaths = async () => {
  let data: Reservation[] = [];
  try {
    data = await getAllReservations();
  } catch (error) {
    return { paths: null, fallback: false }; // temporary
  }

  return {
    paths: data.map(({ name }) => ({
      params: {
        name: `${name}`
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

  const { reservationData, dehydratedState } = await fetchReservationDetails(
    params.name as string
  );

  if (!reservationData || Object.keys(reservationData).length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      reservationData,
      dehydratedState
    }
  };
}) satisfies GetStaticProps<{
  reservationData: ReservationWithExtendedVisits | null;
}>;
