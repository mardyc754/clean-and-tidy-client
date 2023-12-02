import type { ServiceForVisitPart } from '~/schemas/api/services';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

import { convertToCamelCase } from '~/utils/stringUtils';

import ListWrapper from '../wrappers/ListWrapper';

interface ServiceListProps {
  data: ServiceForVisitPart[];
}

const ServiceList = ({ data }: ServiceListProps) => {
  const mainService = data.find(
    (service) => service.isMainServiceForReservation
  );

  const secondaryServices = data.filter(
    (service) => !service.isMainServiceForReservation
  );

  return (
    <ListWrapper title="Services">
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
    </ListWrapper>
  );
};

export default ServiceList;
