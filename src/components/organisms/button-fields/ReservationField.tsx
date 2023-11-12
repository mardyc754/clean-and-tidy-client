import clsx from 'clsx';

import { getWeekDayNameWithFrequencyAndDate } from '~/utils/dateUtils';
import { createReservationTitle } from '~/utils/reservationUtils';

import type { Reservation } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';

interface ReservationDetailsProps {
  data: Reservation;
}

const ReservationField = ({ data }: ReservationDetailsProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-between space-y-4 rounded-xl bg-white p-8 shadow-md',
        'md:flex-row md:space-y-0'
      )}
    >
      <p className="font-semibold">
        {`${createReservationTitle(data)}, 
        ${getWeekDayNameWithFrequencyAndDate(
          data.visits?.[0]?.startDate,
          data.frequency
        )}`}
      </p>
      <div className="flex space-x-4">
        <Button href={`/reservations/${data.name}`}>Manage</Button>
        {/* <Button>Manage</Button> */}
      </div>
      {/* <p className="font-semibold">
        {getWeekDayNameWithFrequencyAndDate(
          data.visits?.[0]?.startDate,
          data.frequency
        )}
      </p> */}
    </div>
  );
};

export default ReservationField;
