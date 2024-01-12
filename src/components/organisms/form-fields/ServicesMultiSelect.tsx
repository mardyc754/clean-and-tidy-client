import clsx from 'clsx';

import type { Service } from '~/schemas/api/services';

import { FormCheckbox } from '~/components/atoms/forms';

interface ChangeEmployeeDataFormProps {
  serviceData: Array<Service>;
  checkboxGroupsDirection?: 'row' | 'column';
  showHeader?: boolean;
  name?: string;
}

const ServicesMultiSelect = ({
  serviceData,
  showHeader = false,
  name = 'employeeServices'
}: ChangeEmployeeDataFormProps) => {
  const primaryServices = serviceData.filter((service) => service.isPrimary);
  const secondaryServices = serviceData.filter((service) => !service.isPrimary);

  return (
    <div className="flex flex-col space-y-4">
      {showHeader && <p className="font-emphasize text-lg">Services</p>}
      <div className={clsx('flex flex-col lg:flex-row lg:space-x-12')}>
        <div className="flex flex-col space-y-2">
          <p>Primary services</p>
          <div>
            {primaryServices.map((service) => (
              <FormCheckbox
                key={`serviceDataCheckbox-primary-${name}-${service.id}`}
                name={`${name}.${service.id}`}
                caption={service.name}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p>Secondary services</p>
          <div>
            {secondaryServices.map((service) => (
              <FormCheckbox
                key={`serviceDataCheckbox-${name}-${service.id}`}
                name={`${name}.${service.id}`}
                caption={service.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMultiSelect;
