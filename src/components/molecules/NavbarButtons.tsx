import Link from 'next/link';
import { NavbarButton, Button } from '../atoms/buttons';
import {
  faCircleUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { ButtonWithDropdown } from './buttons';

const NavbarButtons = () => {
  return (
    <div className="flex w-full items-center justify-evenly">
      <NavbarButton href="/order-service">Order service</NavbarButton>
      <NavbarButton href="/check-reservation">Check reservation</NavbarButton>
      <NavbarButton href="/register">Registration</NavbarButton>
      <Button name="Login" href="/login">
        Login
      </Button>
      {/* <ButtonWithDropdown
        label="Test user"
        dropdownItemsData={[
          {
            label: <Link href="/user/profile">Your profile</Link>,
            icon: faCircleUser
          },
          {
            label: <span>Log out</span>,
            icon: faRightFromBracket
          }
        ]}
      /> */}
    </div>
  );
};

export default NavbarButtons;
