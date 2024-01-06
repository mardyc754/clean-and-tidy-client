import Image from 'next/image';
import React from 'react';

import FormPageImage from '~/assets/couch.jpg';

import { Heading1 } from '~/components/atoms/typography/headings';
import { PageWrapper } from '~/components/template';

type FormPageTemplateProps = {
  title: string;
  headingTitle: string;
  children: React.ReactNode;
  descriptionComponent?: React.ReactNode;
};

const FormPageTemplate = ({
  title,
  headingTitle,
  descriptionComponent,
  children
}: FormPageTemplateProps) => {
  return (
    <PageWrapper title={title}>
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="relative flex h-56 w-full bg-blue-950 lg:h-auto lg:w-1/2">
          <Image
            alt="Living room"
            src={FormPageImage}
            // from https://pixabay.com/pl/photos/kanapa-salon-meble-krzes%C5%82o-tabela-1845270/
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              filter: 'brightness(0.7)'
            }}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center py-16 lg:w-1/2 lg:px-16">
          <div className="p-4">
            <Heading1>{headingTitle}</Heading1>
          </div>
          {children}
          {descriptionComponent}
        </div>
      </div>
    </PageWrapper>
  );
};

export default FormPageTemplate;
