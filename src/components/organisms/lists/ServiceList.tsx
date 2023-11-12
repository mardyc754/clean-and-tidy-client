import clsx from 'clsx';

import type { ServiceForReservation } from '~/schemas/api/services';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

import { convertToCamelCase } from '~/utils/stringUtils';

import ListWrapper from '../wrappers/ListWrapper';

interface ServiceListProps {
  data: ServiceForReservation[];
}

const ServiceList = ({ data }: ServiceListProps) => {
  return (
    <ListWrapper title="Services">
      {data.map((serviceData, i) => (
        <LabeledTypography
          label={serviceData.service.name}
          value={`x ${serviceData.numberOfUnits}`}
          contentDistribution="horizontal"
          labelClasses={clsx(
            'text-xl',
            serviceData.isMainServiceForReservation
              ? 'text-xl font-emphasize'
              : 'text-lg'
          )}
          valueClasses={clsx(
            'text-xl',
            serviceData.isMainServiceForReservation
              ? 'text-xl font-emphasize'
              : 'text-lg font-sans'
          )}
          key={`OrderedServices-${convertToCamelCase(
            serviceData.service.name
          )}-${i}`}
        />
      ))}
    </ListWrapper>
  );
};

export default ServiceList;
