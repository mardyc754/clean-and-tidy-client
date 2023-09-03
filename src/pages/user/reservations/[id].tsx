import { useEffect, useMemo, useState } from 'react';
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths
} from 'next';
import type { Merge } from 'type-fest';

import { PageWrapper } from '~/components/template';
import { Heading1 } from '~/components/atoms/typography/headings';
import { Button, NavigationButton } from '~/components/atoms/buttons';
import {
  CalendarWithHours,
  RadioGroup
} from '~/components/organisms/form-fields';
import { ChangeDataSummary } from '~/components/organisms/layout';
import { LabeledNumericInput } from '~/components/molecules/form-fields';

import { extractHourFromDate, getDateAfter } from '~/utils/dateHandling';
import { frequencyValues } from '~/utils/constants';

import type { SingleReservationData } from '~/types/user';

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
  const [changeDataMode, setChangeDataMode] = useState<'once' | 'permanently'>(
    'once'
  );
  const [frequency, setFrequency] = useState('onceAWeek');
  const cleaningFrequencyData = useMemo(() => frequencyValues.slice(1), []);
  const { name, duration, date: stringifiedDate } = data;
  const date = new Date(stringifiedDate);

  const summaryData = useMemo(
    () =>
      new Map([
        ['Reservation group', `${name}`],
        ['Date', `${date.toLocaleDateString()}`],
        ['Start hour', `${extractHourFromDate(date)}`],
        [
          'End date',
          `${extractHourFromDate(getDateAfter(date, duration, 'h'))}`
        ],
        ['Duration', `${duration} ${duration === 1 ? 'hour' : 'hours'}`]
      ]),
    [date, duration, name]
  );

  useEffect(() => {
    if (changeDataMode === 'permanently') {
      const currentFrequencyName = cleaningFrequencyData.find(
        (freq) => frequency === freq.id
      )?.name;

      currentFrequencyName &&
        summaryData.set('Cleaning frequency', currentFrequencyName);
    }
  }, [changeDataMode, cleaningFrequencyData, frequency, summaryData]);

  return (
    <PageWrapper title={`Manage ${name} reservation`}>
      <div className="p-16">
        <Heading1>Manage reservation</Heading1>
        <div className="flex justify-between">
          <div className="w-3/5 py-8">
            <RadioGroup
              value={changeDataMode}
              onChange={(value) => {
                setChangeDataMode(value as 'once' | 'permanently');
              }}
              label="Change data"
              data={[
                {
                  name: 'Once',
                  id: 'once'
                },
                { name: 'Permanently', id: 'permanently' }
              ]}
            />
            <CalendarWithHours
              label={`${
                changeDataMode === 'once'
                  ? 'Change the cleaning date'
                  : 'Change the next cleaning date'
              }`}
            />
            <LabeledNumericInput
              value={duration}
              setValue={() => {
                /** */
              }}
              label="Cleaning duration - hours (max 12)"
              name="hours"
              className="py-4"
              min={1}
              max={12}
            />
            {changeDataMode === 'permanently' && (
              <RadioGroup
                label="Cleaning frequency"
                data={cleaningFrequencyData}
                value={frequency}
                onChange={(value) => setFrequency(value)}
              />
            )}
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
