import { NavbarButtons } from '../molecules';
import { Logo } from '../atoms/logo';

const Navbar = () => {
  return (
    <header className="flex items-center justify-end bg-white p-5 shadow-md">
      <div className="flex w-1/2">
        <Logo />
      </div>
      <nav className="flex w-1/2 justify-evenly">
        <NavbarButtons />
      </nav>
    </header>
  );
};

export default Navbar;
