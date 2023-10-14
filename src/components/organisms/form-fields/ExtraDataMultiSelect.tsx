import { type ServiceWithUnit } from '~/api/schemas/services';

import { useOrderServiceDataStore } from '~/stores';

import { ExtraDataField } from '~/components/molecules/form-fields';

type ExtraDataMultiSelectProps = {
  data: ServiceWithUnit[];
  className?: string;
};

const ExtraDataMultiSelect = ({
  data,
  className = ''
}: ExtraDataMultiSelectProps) => {
  const { orderService, getServiceNumberOfUnits } = useOrderServiceDataStore(
    (state) => ({
      orderedServices: state.orderedServices,
      orderService: state.orderService,
      getServiceNumberOfUnits: state.getServiceNumberOfUnits
    })
  );

  return (
    <div className={`${className}`}>
      <p className={`py-2 text-base`}>Extra data</p>
      <div className="flex flex-col space-y-4">
        {data.map((item) => (
          <ExtraDataField
            onChangeNumberOfUnits={() => orderService(item, false)}
            selected={getServiceNumberOfUnits(item.id) > 0}
            key={`extra-data-multi-select-${item.id}`}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ExtraDataMultiSelect;
