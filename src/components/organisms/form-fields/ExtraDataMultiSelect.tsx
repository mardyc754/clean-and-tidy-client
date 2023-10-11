import { type ServiceWithUnit } from '~/api/schemas/services';

import { ExtraDataField } from '~/components/molecules/form-fields';

type ExtraDataMultiSelectProps = {
  data: ServiceWithUnit[];
  className?: string;
  onChange: (cost: number, duration: number) => void;
};

const ExtraDataMultiSelect = ({
  data,
  className = '',
  onChange
}: ExtraDataMultiSelectProps) => {
  return (
    <div className={`${className}`}>
      <p className={`py-2 text-base`}>Extra data</p>
      <div className="flex flex-col space-y-4">
        {data.map((item) => (
          <ExtraDataField
            onChangeCostAndDuration={onChange}
            selected={false}
            key={`extra-data-multi-select-${item.id}`}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ExtraDataMultiSelect;