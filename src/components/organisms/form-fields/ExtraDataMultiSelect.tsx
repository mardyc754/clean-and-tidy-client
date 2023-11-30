import type { Service, ServiceWithUnit } from '~/schemas/api/services';
import type {
  EmployeeAvailabilityData,
  OrderServiceInputData
} from '~/schemas/forms/orderService';

import type { CleaningDetailsSlice } from '~/stores/orderService/cleaningDetailsSlice';

import { ExtraDataField } from '~/components/molecules/form-fields';

type ExtraDataMultiSelectProps = {
  title: string;
  name: string;
  data: ServiceWithUnit[];
  defaultValues?: OrderServiceInputData['extraServices'];
  className?: string;
  onChangeNumberOfUnits: CleaningDetailsSlice['onChangeServiceNumberOfUnits'];
  serviceAvailabilityGetter?: (
    serviceId: Service['id']
  ) => EmployeeAvailabilityData[];
};

const ServiceMultiSelect = ({
  title,
  name,
  data,
  className = '',
  defaultValues = [],
  serviceAvailabilityGetter,
  onChangeNumberOfUnits
}: ExtraDataMultiSelectProps) => {
  return (
    <div className={`${className}`}>
      <p className={`py-2 text-base`}>{title}</p>
      <div className="flex flex-col space-y-4">
        {data.map((item, index) => (
          <ExtraDataField
            defaultValue={defaultValues[index]}
            name={`${name}.${index}`}
            key={`extra-data-multi-select-${item.id}`}
            data={item}
            onChangeNumberOfUnits={(value: number) =>
              onChangeNumberOfUnits(value, false, item, index)
            }
            disabled={serviceAvailabilityGetter?.(item.id).length === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceMultiSelect;
