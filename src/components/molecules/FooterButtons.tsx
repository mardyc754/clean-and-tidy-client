import { useAuth } from '~/hooks/auth/useAuth';

import { NavbarButton } from '~/components/atoms/buttons';

const FooterButtons = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex w-full flex-col items-center justify-center p-10 sm:flex-row sm:justify-evenly">
      <NavbarButton href="/order-service">Order service</NavbarButton>
      <NavbarButton href="/check-reservation">Check reservation</NavbarButton>
      {!currentUser && (
        <NavbarButton href="/register">Registration</NavbarButton>
      )}
    </div>
  );
};

export default FooterButtons;
