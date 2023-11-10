import type { Reservation } from '~/schemas/api/reservation';
import {
  getWeekDayName,
  getWeekDayNameWithFrequencyAndDate
} from '~/utils/dateUtils';
import {
  createReservationTitle,
  getMainServiceForReservation
} from '~/utils/reservationUtils';

interface ReservationDetailsProps {
  data: Reservation;
}

const ReservationField = ({ data }: ReservationDetailsProps) => {
  console.log(data);
  return (
    <div className="flex items-center rounded-xl bg-white p-8 shadow-md">
      <p className="font-semibold">{createReservationTitle(data)}</p>
      <p className="font-semibold">
        {getWeekDayNameWithFrequencyAndDate(data.endDate, data.frequency)}
      </p>
    </div>
  );
};

export default ReservationField;
