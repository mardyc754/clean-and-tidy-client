import Image from 'next/image';
import HeroSectionImage from '~/assets/living_room.jpg';
import LargeTypography from '~/components/atoms/typography/regular-text/LargeTypography';

import { Button } from '../atoms/buttons';
import { Heading1 } from '~/components/atoms/typography/headings';
import { Dropdown } from '~/components/molecules/form-fields';

const HeroSection = () => {
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
        <Heading1 color="white">Professional cleaning service</Heading1>
        <LargeTypography color="white">
          Order cleaning from us and enjoy cleanliness in your home and office
        </LargeTypography>
        <div className="flex w-full justify-between">
          <Dropdown />
          <Button
            name="Calculate costs"
            onClick={() => {
              /** */
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
