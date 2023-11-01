import Image from 'next/image';
import HeroSectionImage from '~/assets/living_room.jpg';
import type { Service } from '~/schemas/api/services';

import LargeTypography from '~/components/atoms/typography/regular-text/LargeTypography';

import { Button } from '~/components/atoms/buttons';
import { Heading1 } from '~/components/atoms/typography/headings';
import { Dropdown } from '~/components/molecules/form-fields';
import { useMemo, useState } from 'react';

type HeroSectionProps = {
  services: Service[];
};

const HeroSection = ({ services }: HeroSectionProps) => {
  const options = useMemo(
    () => services.map(({ id, name }) => ({ id, name })),
    [services]
  );

  const [selectedValue, setSelectedValue] = useState(options[0]);

  return (
    <div className="position-relative bg-hero-pattern flex flex-1 flex-col bg-transparent p-0 shadow-md">
      <Image
        alt="Living room"
        src={HeroSectionImage}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          filter: 'brightness(0.7) contrast(0.8)'
        }}
      />
      <div className="z-10 flex h-20 w-1/2 flex-1 flex-col justify-evenly p-16">
        <Heading1 color="white" textSize="text-7xl">
          Professional cleaning service
        </Heading1>
        <LargeTypography color="white">
          Order cleaning from us and enjoy cleanliness in your home or office
        </LargeTypography>
        <div className="flex w-full justify-around">
          <Dropdown
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
          />
          <Button href={`/order-service/${selectedValue?.id}`}>
            Order service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
