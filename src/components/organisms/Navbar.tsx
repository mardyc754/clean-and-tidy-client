import { NavbarButtons } from '../molecules';
import { Logo } from '../atoms/logo';

const Navbar = () => {
  return (
    <header className="flex items-center justify-end bg-white px-16 py-4 shadow-md">
      <div className="flex w-1/2">
        <Logo />
      </div>
      <nav className="w-1/2">
        <NavbarButtons />
      </nav>
    </header>
  );
};

export default Navbar;
