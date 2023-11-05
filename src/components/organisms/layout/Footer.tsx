import { FooterButtons } from '~/components/molecules';

import { SmallTypography } from '~/components/atoms/typography/regular-text';
import { Logo } from '~/components/atoms/logo';

const Footer = () => {
  return (
    <footer className="flex flex-col bg-slate-900 p-0 text-white shadow-md">
      <div className="flex flex-col items-center px-16 py-10">
        <Logo color="white" />
      </div>
      <FooterButtons />
      <div className="border-t-2 border-white px-16 py-4">
        <SmallTypography>&copy; 2023 All rights reserved</SmallTypography>
      </div>
    </footer>
  );
};

export default Footer;
