import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type IconDefinition } from '@fortawesome/free-regular-svg-icons';

import { Heading1 } from '~/components/atoms/typography/headings';
import { ButtonNavigation } from '~/components/organisms/layout';
import { PageWrapper } from '~/components/template';

import type { NavigationButtonProps } from '~/components/atoms/buttons/NavigationButton';
import type { PageWrapperProps } from './PageWrapper';
import clsx from 'clsx';

type ResultPageTemplateProps = {
  heading: string;
  icon: IconDefinition;
  variant: 'success' | 'error';
  caption?: string;
  buttonData: NavigationButtonProps[];
} & PageWrapperProps;

const ResultPageWrapper = ({
  title,
  heading,
  icon,
  buttonData,
  variant,
  caption,
  children
}: ResultPageTemplateProps) => {
  return (
    <PageWrapper title={title}>
      <div className="p-16">
        <div className="flex items-center justify-center">
          <FontAwesomeIcon
            icon={icon}
            className={clsx(
              'text-9xl',
              variant === 'success' ? 'text-green-500' : 'text-red-500'
            )}
          />
        </div>
        <div className="flex flex-col items-center py-8">
          <Heading1>{heading}</Heading1>
          {caption && <p className="text-center">{caption}</p>}

          <div className="flex flex-col p-8 text-xl">{children}</div>
        </div>
        {/* <ButtonNavigation buttonData={buttonData} /> */}
      </div>
    </PageWrapper>
  );
};

export default ResultPageWrapper;
