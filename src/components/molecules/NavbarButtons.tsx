import { NavbarButton, NavigationButton } from '../atoms/buttons';

const NavbarButtons = () => {
  return (
    <div className="flex w-full items-center justify-evenly">
      {/* <NavbarButton name="For home" />
      <NavbarButton name="For office" /> */}
      <NavbarButton name="Registration" navigateOnClickTo="/register" />
      <NavigationButton name="Login" navigateOnClickTo="/login" />
    </div>
  );
};

export default NavbarButtons;
