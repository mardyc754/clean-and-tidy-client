import React from 'react';
import Link, { type LinkProps } from 'next/link';

type OptionalLinkProps = Partial<LinkProps> & {
  children?: React.ReactNode;
};

const OptionalLink = ({ href, children, ...props }: OptionalLinkProps) => {
  return href ? (
    <Link href={href} {...props}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export default OptionalLink;
