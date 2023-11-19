import {
  type BasicServiceData,
  type ServiceWithUnit
} from '~/schemas/api/services';
import type { OrderServiceInputData } from '~/schemas/forms/orderService';

import { ExtraDataField } from '~/components/molecules/form-fields';

type ExtraDataMultiSelectProps = {
  title: string;
  name: string;
  data: ServiceWithUnit[];
  defaultValues?: OrderServiceInputData['extraServices'];
  className?: string;
  onChangeNumberOfUnits: (
    numberOfUnits: number,
    isMainService: boolean,
    serviceData: BasicServiceData,
    positionOnList: number
  ) => void;
};

const ServiceMultiSelect = ({
  title,
  name,
  data,
  className = '',
  defaultValues = [],
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
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceMultiSelect;
