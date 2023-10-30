import {
  type ServiceWithUnit,
  type BasicServiceData
} from '~/schemas/api/services';

import { ExtraDataField } from '~/components/molecules/form-fields';

type ExtraDataMultiSelectProps = {
  name: string;
  data: ServiceWithUnit[];
  className?: string;
  onChangeNumberOfUnits: (
    numberOfUnits: number,
    isMainService: boolean,
    serviceData: BasicServiceData
  ) => void;
};

const ExtraDataMultiSelect = ({
  name,
  data,
  className = '',
  onChangeNumberOfUnits
}: ExtraDataMultiSelectProps) => {
  return (
    <div className={`${className}`}>
      <p className={`py-2 text-base`}>Extra services</p>
      <div className="flex flex-col space-y-4">
        {data.map((item, index) => (
          <ExtraDataField
            name={`${name}.${index}`}
            key={`extra-data-multi-select-${item.id}`}
            data={item}
            onChangeNumberOfUnits={(value: number) =>
              onChangeNumberOfUnits(value, false, item)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ExtraDataMultiSelect;
