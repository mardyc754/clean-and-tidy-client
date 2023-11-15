import Link from 'next/link';

type RegularLinkProps = {
  href: string;
  children: string;
};

const RegularLink = ({ href, children }: RegularLinkProps) => {
  return (
    <Link href={href}>
      <span className="font-link text-cyan-400 underline">{children}</span>
    </Link>
  );
};

export default RegularLink;
