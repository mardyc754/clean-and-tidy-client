import { NavbarButton, Button } from '../atoms/buttons';

const NavbarButtons = () => {
  return (
    <div className="flex w-full items-center justify-evenly">
      {/* <NavbarButton name="For home" />
      <NavbarButton name="For office" /> */}
      <NavbarButton name="Order service" href="/order-service" />
      <NavbarButton name="Check reservation" href="/check-reservation" />
      <NavbarButton name="Registration" href="/register" />
      <Button name="Login" href="/login">
        Login
      </Button>
    </div>
  );
};

export default NavbarButtons;
