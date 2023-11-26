import { useAuth } from '~/hooks/auth/useAuth';

import { Button, NavbarButton } from '~/components/atoms/buttons';

import { UserOptionsButton } from './buttons';

const NavbarButtons = () => {
  const { currentUser, isPending } = useAuth();

  if (isPending) return null;

  return (
    <div className="flex w-full items-center justify-evenly">
      <NavbarButton href="/order-service">Order service</NavbarButton>
      <NavbarButton href="/check-reservation">Check reservation</NavbarButton>
      {!currentUser ? (
        <>
          <NavbarButton href="/register">Registration</NavbarButton>
          <Button name="Login" href="/login">
            Login
          </Button>
        </>
      ) : (
        <UserOptionsButton userData={currentUser} />
      )}
    </div>
  );
};

export default NavbarButtons;
