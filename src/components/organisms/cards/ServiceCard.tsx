import * as React from 'react';

import type { VisitPart } from '~/schemas/api/reservation';
import type { ServiceForVisitPart } from '~/schemas/api/services';
import type { Service } from '~/schemas/api/services';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '~/components/shadcn/ui/card';

import { convertToCamelCase } from '~/utils/stringUtils';

type ServiceWithNumberOfUnits = {
  id: Service['id'];
  numberOfUnits: VisitPart['numberOfUnits'];
};
interface UserProfileCardProps {
  data: ServiceForVisitPart[];
  units: ServiceWithNumberOfUnits[];
}

const ServiceCard = ({ data, units }: UserProfileCardProps) => {
  const mainService = data.find(
    (service) => service.isMainServiceForReservation
  );
  const mainServiceNumberOfUnits =
    units.find((unit) => unit.id === mainService?.id)?.numberOfUnits ?? 0;

  const secondaryServices = data
    .filter((service) => !service.isMainServiceForReservation)
    .map((service) => ({
      service: service,
      numberOfUnits:
        units.find((unit) => unit.id === service.id)?.numberOfUnits ?? 0
    }));

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
              mainServiceNumberOfUnits > 0
                ? `${mainServiceNumberOfUnits} ${mainService.unit?.shortName}`
                : ''
            }
            contentDistribution="horizontal"
            labelClasses={'text-xl font-emphasize'}
            valueClasses={'text-xl font-emphasize'}
          />
        )}
        {secondaryServices.map(({ service, numberOfUnits }, i) => (
          <LabeledTypography
            label={service.name}
            value={`x ${numberOfUnits}`}
            contentDistribution="horizontal"
            labelClasses={'text-lg'}
            valueClasses={'text-lg font-sans'}
            key={`OrderedServices-secondary-${convertToCamelCase(
              service.name
            )}-${i}`}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
