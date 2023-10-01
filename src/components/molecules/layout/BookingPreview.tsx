import { useState } from 'react';

import { Button } from '~/components/atoms/buttons';
import { extractHourFromDate, getDateAfter } from '~/utils/dateHandling';
import type { SingleReservationData } from '~/types/user';
import { ReservationManagementDialog } from '~/components/organisms/dialogs';

type BookingPreviewProps = {
  data: SingleReservationData;
};

const BookingPreview = ({ data }: BookingPreviewProps) => {
  const [open, setOpen] = useState(false);

  const { name, duration, date, id } = data;

  const startHour = extractHourFromDate(date);
  const endHour = extractHourFromDate(getDateAfter(date, duration, 'h'));

  return (
    <>
      <div className="flex flex-col rounded-xl border-2 border-slate-400 p-8">
        <div className="w-full border-b-2 border-slate-400 text-2xl">
          <p className="flex justify-between py-2 text-2xl">
            {date.toLocaleDateString()}
            <span>{`${startHour} - ${endHour}`}</span>
          </p>
        </div>
        <div className="flex justify-between pt-4">
          <p className="text-lg">{name}</p>
          <Button onClick={() => setOpen(true)}>Manage reservation</Button>
        </div>
      </div>
      <ReservationManagementDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        data={data}
      />
    </>
  );
};

export default BookingPreview;
