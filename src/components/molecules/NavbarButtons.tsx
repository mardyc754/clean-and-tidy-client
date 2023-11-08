import Link from 'next/link';
import {
  faCircleUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '~/hooks/auth/useAuth';
import { useLogout } from '~/hooks/auth/useLogout';

import { NavbarButton, Button } from '~/components/atoms/buttons';

import { getUserLabel } from '~/utils/userUtils';

import { ButtonWithDropdown } from './buttons';

const NavbarButtons = () => {
  const { currentUser } = useAuth();
  const { logout } = useLogout();

  return (
    <div className="flex w-full items-center justify-evenly">
      <NavbarButton href="/order-service">Order service</NavbarButton>
      <NavbarButton href="/check-reservation">Check reservation</NavbarButton>
      <NavbarButton href="/register">Registration</NavbarButton>
      {!currentUser ? (
        <Button name="Login" href="/login">
          Login
        </Button>
      ) : (
        <ButtonWithDropdown
          label={getUserLabel(currentUser)}
          dropdownItemsData={[
            {
              label: <Link href="/user/profile">Your profile</Link>,
              icon: faCircleUser
            },
            {
              label: <span onClick={logout}>Log out</span>,
              icon: faRightFromBracket
            }
          ]}
        />
      )}
    </div>
  );
};

export default NavbarButtons;
