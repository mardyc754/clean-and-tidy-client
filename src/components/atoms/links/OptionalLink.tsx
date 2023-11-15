import Link, { type LinkProps } from 'next/link';
import React from 'react';

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
