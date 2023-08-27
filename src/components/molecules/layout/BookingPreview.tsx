import type { SingleReservationData } from '~/types/user';

type BookingPreviewProps = {
  data: SingleReservationData;
};

const BookingPreview = ({ data }: BookingPreviewProps) => {
  const { name, date } = data;

  return (
    <div className="flex flex-col rounded-xl border-2 border-slate-400 p-8">
      <p className="w-full border-b-2 border-slate-400 text-2xl">
        {date.toLocaleDateString()}
      </p>
      <p className="text-lg">{name}</p>
    </div>
  );
};

export default BookingPreview;
