import { Button } from '~/components/atoms/buttons';

import { extractHourStringFromDate, getDateAfter } from '~/utils/dateUtils';

import type { SingleVisitData } from '~/types/user';

type ReservationManagementPreviewProps = {
  data: SingleVisitData;
};

const ReservationManagementPreview = ({
  data
}: ReservationManagementPreviewProps) => {
  const { name, duration, date, id } = data;

  const startHour = extractHourStringFromDate(date);
  const endHour = extractHourStringFromDate(getDateAfter(date, duration, 'h'));

  return (
    <div className="flex flex-col rounded-xl border-2 border-slate-400 p-4">
      <div className="w-full border-b-2 border-slate-400 text-2xl">
        <p className="flex justify-between py-2 text-2xl">
          {date.toLocaleDateString()}
          <span>{`${startHour} - ${endHour}`}</span>
        </p>
      </div>
      <div className="flex justify-between pt-4">
        {/* maybe change pernamently here as well? */}
        <Button>Change the date</Button>
        <Button color="danger">Cancel reservation</Button>
      </div>
    </div>
  );
};

export default ReservationManagementPreview;
