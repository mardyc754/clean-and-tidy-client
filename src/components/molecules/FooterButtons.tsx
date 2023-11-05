import { NavbarButton } from '~/components/atoms/buttons';

const FooterButtons = () => {
  return (
    <div className="flex w-full justify-evenly p-10">
      <NavbarButton href="/order-service">Order service</NavbarButton>
      <NavbarButton href="/check-reservation">Check reservation</NavbarButton>
      <NavbarButton href="/register">Registration</NavbarButton>
    </div>
  );
};

export default FooterButtons;
