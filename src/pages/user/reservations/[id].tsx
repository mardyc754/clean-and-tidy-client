import { useMemo, useState } from 'react';
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths
} from 'next';
import type { Merge } from 'type-fest';

import { Heading1 } from '~/components/atoms/typography/headings';
import { Button, NavigationButton } from '~/components/atoms/buttons';
import { ChangeCleaningDataForm } from '~/components/organisms/forms';
import { frequencyValues } from '~/components/organisms/forms/constants';
import { ChangeDataSummary } from '~/components/organisms/layout';
import { PageWrapper } from '~/components/template';

import { extractHourFromDate, getDateAfter } from '~/utils/dateHandling';

import type { SingleReservationData } from '~/types/user';
import type { ChangeDataMode, CleaningFrequencyKey } from '~/types/forms';

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
      }
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
  const [changeDataMode, setChangeDataMode] = useState<ChangeDataMode>('once');
  const [frequency, setFrequency] = useState<CleaningFrequencyKey>('onceAWeek');
  const cleaningFrequencyData = useMemo(() => frequencyValues.slice(1), []);

  const { name, duration, date: stringifiedDate } = data;
  const date = useMemo(() => new Date(stringifiedDate), [stringifiedDate]);

  const summaryData = useMemo(
    () =>
      new Map([
        ['Reservation group', `${name}`],
        [
          `${changeDataMode === 'once' ? 'Date' : 'Next cleaning date'}`,
          `${date.toLocaleDateString()}`
        ],
        ['Start hour', `${extractHourFromDate(date)}`],
        [
          'End date',
          `${extractHourFromDate(getDateAfter(date, duration, 'h'))}`
        ],
        ['Duration', `${duration} ${duration === 1 ? 'hour' : 'hours'}`],
        [
          'Cleaning frequency',
          `${cleaningFrequencyData.find((freq) => frequency === freq.id)?.name}`
        ]
      ]),
    [date, duration, name, frequency, changeDataMode, cleaningFrequencyData]
  );

  return (
    <PageWrapper title={`Manage ${name} reservation`}>
      <div className="p-16">
        <Heading1>Manage reservation</Heading1>
        <div className="flex justify-between">
          <div className="w-3/5 py-8">
            <ChangeCleaningDataForm
              data={{ ...data, date }}
              changeDataMode={changeDataMode}
              onChangeDataMode={(value) => {
                setChangeDataMode(value as ChangeDataMode);
              }}
              frequency={frequency}
              onChangeFrequency={(value) => {
                setFrequency(value as CleaningFrequencyKey);
              }}
            />
          </div>
          <div className="w-1/3">
            <ChangeDataSummary data={summaryData} />
          </div>
        </div>
        <div className="flex items-center justify-between py-8">
          <Button>Save the changes</Button>
          <NavigationButton navigateOnClickTo="/user/profile" name="Cancel" />
        </div>
      </div>
    </PageWrapper>
  );
}
