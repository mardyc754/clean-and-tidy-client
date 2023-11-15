import Image from 'next/image';
import React from 'react';

import FormPageImage from '~/assets/couch.jpg';

import { Heading1 } from '~/components/atoms/typography/headings';
import { PageWrapper } from '~/components/template';

type FormPageTemplateProps = {
  title: string;
  headingTitle: string;
  children: React.ReactNode;
};

const FormPageTemplate = ({
  title,
  headingTitle,
  children
}: FormPageTemplateProps) => {
  return (
    <PageWrapper title={title}>
      <div className="flex flex-1">
        <div className="relative flex w-1/2 bg-blue-950">
          <Image
            alt="Living room"
            src={FormPageImage}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              filter: 'brightness(0.7)'
            }}
          />
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center p-16">
          <div className="p-4">
            <Heading1>{headingTitle}</Heading1>
          </div>
          {children}
        </div>
      </div>
    </PageWrapper>
  );
};

export default FormPageTemplate;
