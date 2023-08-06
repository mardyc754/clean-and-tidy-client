import { NavbarButtons } from '../molecules';
import { Logo } from '../atoms/logo';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-end bg-white p-5 shadow-md">
      <div className="flex w-1/2">
        <Logo />
      </div>
      <div className="flex w-1/2 justify-evenly">
        <NavbarButtons />
      </div>
    </nav>
  );
};

export default Navbar;
