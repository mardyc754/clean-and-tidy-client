import { Heading1 } from '~/components/atoms/typography/headings';
import { PageWrapper } from '~/components/template';
import type { NavigationButtonProps } from '~/components/atoms/buttons/NavigationButton';

import type { PageWrapperProps } from './PageWrapper';
import { IconIndicator } from '../molecules/status-indicators';

type ResultPageTemplateProps = {
  heading: string;
  variant: 'success' | 'error';
  caption?: string;
  buttonData: NavigationButtonProps[];
} & PageWrapperProps;

const ResultPageWrapper = ({
  title,
  heading,
  buttonData,
  variant,
  caption,
  children
}: ResultPageTemplateProps) => {
  return (
    <PageWrapper title={title}>
      <div className="p-16">
        <IconIndicator variant={variant} size="large" />
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
