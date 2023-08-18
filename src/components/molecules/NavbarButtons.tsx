import { NavbarButton, NavigationButton } from '../atoms/buttons';

const NavbarButtons = () => {
  return (
    <div className="flex w-full justify-evenly">
      <NavbarButton
        name="For home"
        onClick={() => {
          /** TODO */
        }}
      />
      <NavbarButton
        name="For office"
        onClick={() => {
          /** TODO */
        }}
      />
      <NavbarButton
        name="Registration"
        onClick={() => {
          /** TODO */
        }}
      />
      <NavigationButton name="Login" navigateOnClickTo="/login" />
    </div>
  );
};

export default NavbarButtons;
