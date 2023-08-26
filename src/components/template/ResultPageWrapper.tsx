import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type IconDefinition } from '@fortawesome/free-regular-svg-icons';

import { Heading1 } from '~/components/atoms/typography/headings';
import { ButtonNavigation } from '~/components/organisms/layout';
import { PageWrapper } from '~/components/template';

import type { NavigationButtonProps } from '~/components/atoms/buttons/NavigationButton';
import type { PageWrapperProps } from './PageWrapper';

type ResultPageTemplateProps = {
  heading: string;
  icon: IconDefinition;
  buttonData: NavigationButtonProps[];
} & PageWrapperProps;

const ResultPageWrapper = ({
  title,
  heading,
  icon,
  buttonData,
  children
}: ResultPageTemplateProps) => {
  return (
    <PageWrapper title={title}>
      <div className="p-16">
        <div className="flex items-center justify-center">
          <Heading1>{heading}</Heading1>
        </div>
        <div className="flex flex-col items-center py-8">
          <FontAwesomeIcon icon={icon} className="text-[15rem] text-cyan-500" />
          <div className="flex flex-col p-8 text-xl">{children}</div>
        </div>
        <ButtonNavigation buttonData={buttonData} />
      </div>
    </PageWrapper>
  );
};

export default ResultPageWrapper;
