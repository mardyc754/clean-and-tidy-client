import { NavbarButton } from '~/components/atoms/buttons';
import { useAuth } from '~/hooks/auth/useAuth';

const FooterButtons = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex w-full justify-evenly p-10">
      <NavbarButton href="/order-service">Order service</NavbarButton>
      <NavbarButton href="/check-reservation">Check reservation</NavbarButton>
      {!currentUser && (
        <NavbarButton href="/register">Registration</NavbarButton>
      )}
    </div>
  );
};

export default FooterButtons;
