import Link from 'next/link';
type RegularLinkProps = {
  href: string;
  children: string;
};

const RegularLink = ({ href, children }: RegularLinkProps) => {
  return (
    <Link href={href}>
      <span className="font-link text-cyan-300 underline">{children}</span>
    </Link>
  );
};

export default RegularLink;
