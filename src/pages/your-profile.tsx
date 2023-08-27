import { Button } from '~/components/atoms/buttons';
import { Heading1, Heading2 } from '~/components/atoms/typography/headings';
import { Avatar } from '~/components/atoms/user';
import { BookingPreview } from '~/components/molecules/layout';
import { PageWrapper } from '~/components/template';

const exampleSingleReservationData = {
  name: 'Home Cleaning',
  duration: 2,
  date: new Date(2023, 7, 17, 8)
};

const YourProfile = () => {
  return (
    <PageWrapper title="Your profile">
      <div className="p-16">
        <Heading1>Your profile</Heading1>

        <div className="my-8 flex gap-16 rounded-xl border-2 border-slate-400 p-8">
          <Avatar size="large" />
          <div className="flex flex-col justify-evenly font-link">
            <p className="text-4xl">John Doe</p>
            <Button
              name="Edit profile"
              onClick={() => {
                /** */
              }}
            />
          </div>
        </div>

        <Heading2>Your Bookings</Heading2>
        <div className="my-8">
          <BookingPreview data={exampleSingleReservationData} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default YourProfile;
