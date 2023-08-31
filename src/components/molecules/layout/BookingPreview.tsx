import { useState } from 'react';

import { Button } from '~/components/atoms/buttons';
import { ReservationManagementDialog } from '~/components/organisms/dialogs';
import type { SingleReservationData } from '~/types/user';
import { extractHourFromDate, getDateAfter } from '~/utils/dateHandling';

type BookingPreviewProps = {
  data: SingleReservationData;
};

const BookingPreview = ({ data }: BookingPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { name, duration, date } = data;

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
          <Button name="Manage Booking" onClick={() => setIsOpen(true)} />
          {/* <Button name="Edit single reservation" />
        <Button name="Edit booking details" /> 
        <Button name="Cancel single reservation" />
        <Button name="Cancel whole reservation" />
      */}
        </div>
      </div>
      <ReservationManagementDialog
        data={data}
        title="Deactivate account"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default BookingPreview;
