import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '~/components/shadcn/ui/navigation-menu';

type NavbarButtonProps = {
  children: React.ReactNode;
  href?: string;
};

const NavbarButton = ({ href = '', children }: NavbarButtonProps) => {
  return (
    <Link href={href}>
      <button className={'py-2 font-link text-base'}>{children}</button>
    </Link>
    // <NavigationMenuItem>
    //   <Link href={href} legacyBehavior passHref>
    //     <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //       Documentation
    //     </NavigationMenuLink>
    //   </Link>
    // </NavigationMenuItem>
  );
};

export default NavbarButton;
