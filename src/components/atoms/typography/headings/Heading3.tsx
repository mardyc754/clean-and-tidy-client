type Heading3Props = {
  children: string;
};

const Heading3 = ({ children }: Heading3Props) => {
  return <h3 className="text-3xl">{children}</h3>;
};

export default Heading3;
