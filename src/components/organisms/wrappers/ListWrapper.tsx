import { Heading3 } from '~/components/atoms/typography/headings';

interface ListWrapperProps {
  title: string;
  children?: React.ReactNode;
}

const ListWrapper = ({ title, children }: ListWrapperProps) => {
  return (
    <div className="py-8">
      <Heading3>{title}</Heading3>
      <div className="pt-4">{children}</div>
    </div>
  );
};

export default ListWrapper;
