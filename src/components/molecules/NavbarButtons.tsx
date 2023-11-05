import { NavbarButton, Button } from '../atoms/buttons';

const NavbarButtons = () => {
  return (
    <div className="flex w-full items-center justify-evenly">
      <NavbarButton href="/order-service">Order service</NavbarButton>
      <NavbarButton href="/check-reservation">Check reservation</NavbarButton>
      <NavbarButton href="/register">Registration</NavbarButton>
      <Button name="Login" href="/login">
        Login
      </Button>
    </div>
  );
};

export default NavbarButtons;
