import { AddressDataField, SummaryView } from '~/components/organisms/layout';
import { Heading2 } from '~/components/atoms/typography/headings';

import type { AddressData } from '~/types/forms';

const SummaryForm = () => {
  const data = new Map([
    ['Selected offer', 'Home cleaning'],
    ['Cleaning frequency', 'Once a week'],
    ['Cleaning duration', '2 hours'],
    ['First cleaning date', '17.08.2023 8:00']
  ]);

  const addressData: AddressData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '123-456-7890',
    street: '123 Main Street',
    houseNumber: 'Apt 4B',
    postcode: '12345',
    city: 'Cityville',
    extraInfo: 'Additional information goes here'
  };

  const totalCost = 200;

  return (
    <div className="pt-16">
      <SummaryView
        data={data}
        totalCost={totalCost}
        labelClasses="text-lg"
        valueClasses="text-2xl"
        contentDistribution="stretch"
        summaryTypographySize="large"
      />
      <div className="py-16">
        <Heading2>Address data</Heading2>
        <div className="pt-8">
          <AddressDataField data={addressData} />
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
