import type { DehydratedState } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import type {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType
} from 'next';

import { fetchReservationDetails } from '~/server/prefetchReservationData';
import { fetchUserData } from '~/server/prefetchUserData';

import { getAllReservations, getReservationByName } from '~/api/reservation';

import type { ClientUser } from '~/schemas/api/auth';
import type {
  Reservation,
  ReservationWithExtendedVisits
} from '~/schemas/api/reservation';

import { useAuth } from '~/hooks/auth/useAuth';
import { useReservation } from '~/hooks/reservation/useReservation';

import { Heading1 } from '~/components/atoms/typography/headings';
import { ReservationDetails } from '~/components/organisms/data-display';
import { PageWrapper } from '~/components/template';

import { isClientUser } from '~/utils/userUtils';

export default function ReservationPage({
  reservationData
}: // }: InferGetServerSidePropsType<typeof getStaticProps>) {
InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useReservation(reservationData.name);

  const { hasAccess } = useAuth(
    (user) => user.email === reservationData.bookerEmail,
    true
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

export const getServerSideProps = (async (ctx) => {
  const initialData = await fetchReservationDetails(ctx);

  const { userData, dehydratedState, reservationData } = initialData;

  if (!isClientUser(userData)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  if (!reservationData || Object.keys(reservationData).length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      userData,
      dehydratedState,
      reservationData: reservationData as ReservationWithExtendedVisits
    }
  };
}) satisfies GetServerSideProps<{
  dehydratedState: DehydratedState;
  userData: ClientUser;
  reservationData: ReservationWithExtendedVisits;
}>;
// export const getStaticPaths = async () => {
//   let data: Reservation[] = [];
//   try {
//     data = await getAllReservations();
//   } catch (error) {
//     return { paths: [], fallback: false }; // temporary
//   }

//   return {
//     paths: data.map(({ name }) => ({
//       params: {
//         id: `${name}`
//       }
//     })),
//     fallback: true
//   };
// };

// export const getStaticProps = (async ({ params }) => {
//   if (!params) {
//     return {
//       notFound: true
//     };
//   }

//   let data: ReservationWithExtendedVisits | null = null;

//   try {
//     data = await getReservationByName(params.id as string);
//   } catch (error) {
//     return {
//       notFound: true
//     };
//   }
//   return {
//     props: {
//       data
//     }
//   };
// }) satisfies GetStaticProps<{ data: ReservationWithExtendedVisits | null }>;
