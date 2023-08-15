type Heading1Props = {
  children: string;
};

const Heading1 = ({ children }: Heading1Props) => {
  return <h1>{children}</h1>;
};

export default Heading1;
