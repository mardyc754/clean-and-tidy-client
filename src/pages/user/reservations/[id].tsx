import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths
} from 'next';
import type { SingleReservationData } from '~/types/user';
import type { Merge } from 'type-fest';
import { PageWrapper } from '~/components/template';
import { Heading1 } from '~/components/atoms/typography/headings';
import { extractHourFromDate } from '~/utils/dateHandling';

const exampleSingleReservationData = {
  id: 1, // or UUID
  name: 'Home Cleaning',
  duration: 2,
  date: new Date(2023, 7, 17, 8)
};

type StringifiedReservationData = Merge<
  Omit<SingleReservationData, 'date'>,
  { date: string }
>;

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: `${exampleSingleReservationData.id}`
        }
      } //
    ],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<{
  data: StringifiedReservationData;
  // eslint-disable-next-line @typescript-eslint/require-await
}> = async () => {
  const { date } = exampleSingleReservationData;
  const data = { ...exampleSingleReservationData, date: date.toString() };
  return { props: { data } };
};

export default function Reservation({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { id, name, duration, date: stringifiedDate } = data;
  const date = new Date(stringifiedDate);
  // return <p>{name}</p>;
  return (
    <PageWrapper title={`Manage ${name} reservation`}>
      <div className="p-16">
        <Heading1>Manage reservation</Heading1>
      </div>
      <div></div>
    </PageWrapper>
  );
}
