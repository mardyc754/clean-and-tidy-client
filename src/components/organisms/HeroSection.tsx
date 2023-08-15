import { Heading1 } from '~/components/atoms/typography/headings';
import LargeTypography from '~/components/atoms/typography/regular-text/LargeTypography';
import { Dropdown } from '~/components/molecules';
import { Button } from '../atoms/buttons';

const HeroSection = () => {
  return (
    <div className="flex items-center bg-blue-950 p-5 shadow-md">
      <Heading1>Professional cleaning service</Heading1>
      <LargeTypography>
        Order cleaning from us and enjoy cleanliness in your home and office
      </LargeTypography>
      <Dropdown />

      <Button
        name="Calculate costs"
        onClick={() => {
          /** */
        }}
      />
    </div>
  );
};

export default HeroSection;
