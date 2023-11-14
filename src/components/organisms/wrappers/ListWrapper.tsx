import clsx from 'clsx';

import { Heading3, Heading2 } from '~/components/atoms/typography/headings';

export interface ListWrapperProps {
  title: string;
  children?: React.ReactNode;
  component?: 'h2' | 'h3';
  contentWrapperClasses?: string;
}

const ListWrapper = ({
  title,
  component = 'h3',
  contentWrapperClasses = '',
  children
}: ListWrapperProps) => {
  const Heading = component === 'h2' ? Heading2 : Heading3;
  return (
    <div className="py-8">
      <Heading>{title}</Heading>
      <div className={clsx('pt-4', contentWrapperClasses)}>{children}</div>
    </div>
  );
};

export default ListWrapper;
