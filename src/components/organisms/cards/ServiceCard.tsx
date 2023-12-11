import * as React from 'react';

import type { ServiceForVisitPart } from '~/schemas/api/services';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import { Button } from '~/components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/shadcn/ui/card';

import { convertToCamelCase } from '~/utils/stringUtils';

interface UserProfileCardProps {
  data: ServiceForVisitPart[];
}

const ServiceCard = ({ data }: UserProfileCardProps) => {
  const mainService = data.find(
    (service) => service.isMainServiceForReservation
  );

  const secondaryServices = data.filter(
    (service) => !service.isMainServiceForReservation
  );

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Services</CardTitle>
      </CardHeader>
      <CardContent>
        {mainService && (
          <LabeledTypography
            label={mainService.name}
            value={
              mainService.numberOfUnits > 0
                ? `${mainService.numberOfUnits} x ${mainService.unit?.shortName}`
                : ''
            }
            contentDistribution="horizontal"
            labelClasses={'text-xl font-emphasize'}
            valueClasses={'text-xl font-emphasize'}
          />
        )}
        {secondaryServices.map((serviceData, i) => (
          <LabeledTypography
            label={serviceData.name}
            value={`x ${serviceData.numberOfUnits}`}
            contentDistribution="horizontal"
            labelClasses={'text-lg'}
            valueClasses={'text-lg font-sans'}
            key={`OrderedServices-secondary-${convertToCamelCase(
              serviceData.name
            )}-${i}`}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
