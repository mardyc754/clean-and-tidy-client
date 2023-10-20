import { type ServiceWithUnit } from '~/api/schemas/services';

import { ExtraDataField } from '~/components/molecules/form-fields';

type ExtraDataMultiSelectProps = {
  name: string;
  data: ServiceWithUnit[];
  className?: string;
};

const ExtraDataMultiSelect = ({
  name,
  data,
  className = ''
}: ExtraDataMultiSelectProps) => {
  return (
    <div className={`${className}`}>
      <p className={`py-2 text-base`}>Extra data</p>
      <div className="flex flex-col space-y-4">
        {data.map((item, index) => (
          <ExtraDataField
            name={`${name}.${index}`}
            key={`extra-data-multi-select-${item.id}`}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ExtraDataMultiSelect;
