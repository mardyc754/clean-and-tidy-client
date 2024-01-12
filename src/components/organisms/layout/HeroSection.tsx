import Image from 'next/image';
import { useMemo, useState } from 'react';

import HeroSectionImage from '~/assets/living_room.jpg';

import type { Service } from '~/schemas/api/services';

import { Button } from '~/components/atoms/buttons';
import { Heading1 } from '~/components/atoms/typography/headings';
import LargeTypography from '~/components/atoms/typography/regular-text/LargeTypography';
import { Dropdown } from '~/components/molecules/form-fields';

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
        // from https://pixabay.com/pl/photos/salon-krzes%C5%82o-sofa-kanapa-dom-2155376/
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          filter: 'brightness(0.7) contrast(0.8)'
        }}
      />
      <div className="z-10 flex w-full flex-1 flex-col justify-center md:p-16">
        <div className="space-y-12 rounded-lg bg-white p-20 md:p-28">
          <div className="flex flex-col items-center justify-center">
            <Heading1 textSize="text-5xl">
              Professional cleaning services
            </Heading1>
          </div>
          <div className="flex flex-col items-center space-y-10">
            <LargeTypography>
              Order cleaning from us and enjoy cleanliness in your home or
              office
            </LargeTypography>
            <div className="flex w-full flex-col items-center justify-center space-y-8 md:flex-row md:space-x-8 md:space-y-0">
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
      </div>
    </div>
  );
};

export default HeroSection;
