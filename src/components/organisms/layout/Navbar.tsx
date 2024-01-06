import clsx from 'clsx';

import { useMobileCheck } from '~/hooks/useMobileCheck';

import { Logo } from '~/components/atoms/logo';
import { NavbarButtons, NavigationButtons } from '~/components/molecules';

const Navbar = () => {
  const { isMobile } = useMobileCheck();

  return (
    <header className="flex items-center justify-end bg-white px-16 py-4 shadow-md">
      <div
        className={clsx(
          'flex',
          !isMobile ? 'w-1/2' : 'w-full items-center justify-center'
        )}
      >
        <Logo />
      </div>

      <nav className={clsx(!isMobile && 'w-3/4 lg:w-1/2')}>
        {!isMobile && <NavbarButtons />}
        {/* <NavigationButtons /> */}
      </nav>
    </header>
  );
};

export default Navbar;
