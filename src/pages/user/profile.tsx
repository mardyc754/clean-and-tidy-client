import { useState } from 'react';

import { Button } from '~/components/atoms/buttons';
import { Heading1, Heading2 } from '~/components/atoms/typography/headings';
import { Avatar } from '~/components/atoms/user';
import { Dropdown } from '~/components/molecules/form-fields';
import { BookingPreview } from '~/components/molecules/layout';
import { PageWrapper } from '~/components/template';

const exampleSingleReservationData = {
  id: 1, // or UUID
  name: 'Home Cleaning',
  duration: 2,
  date: new Date(2023, 7, 17, 8)
};

const exampleOptions = [
  { id: 1, name: 'Upcoming' },
  { id: 2, name: 'Recent' }
];

const YourProfile = () => {
  const [selectedValue, setSelectedValue] = useState(exampleOptions[0]);

  return (
    <PageWrapper title="Your profile">
      <div className="p-16">
        <Heading1>Your profile</Heading1>

        <div className="my-8 flex gap-16 rounded-xl border-2 border-slate-400 p-8">
          {/* <Avatar size="large" /> */}
          <div className="flex flex-col justify-evenly font-link">
            <p className="text-4xl">John Doe</p>
            <Button>Edit profile</Button>
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <Heading2>Your Bookings</Heading2>
          <div className="flex items-center space-x-2">
            <p>Show:</p>
            <Dropdown
              value={selectedValue}
              options={exampleOptions}
              onChange={setSelectedValue}
              className="w-40"
            />
          </div>
        </div>
        <div className="my-8 space-y-5">
          <BookingPreview data={exampleSingleReservationData} />
          <BookingPreview data={exampleSingleReservationData} />
          <BookingPreview data={exampleSingleReservationData} />
          <BookingPreview data={exampleSingleReservationData} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default YourProfile;
