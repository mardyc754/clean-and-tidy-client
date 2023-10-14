import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type ServiceWithUnit } from '~/api/schemas/services';

import { Button } from '~/components/atoms/buttons';
import { OrderServiceNumericInput } from '.';
import { convertToSnakeCase } from '~/utils/stringUtils';

type ExtraDataFieldProps = {
  data: ServiceWithUnit;
  selected: boolean;
  onChangeNumberOfUnits: VoidFunction;
};

const ExtraDataField = ({
  data,
  selected,
  onChangeNumberOfUnits
}: ExtraDataFieldProps) => {
  const { name, unit } = data;
  const { name: unitName, price } = unit;

  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-white px-5 py-4 shadow-md focus:outline-none`}
    >
      <div
        className={`flex flex-col 
        `}
      >
        <p className="font-medium">{name}</p>
        <p className="text-sm">{`${price} zł/${unitName}`}</p>
      </div>
      {selected ? (
        <OrderServiceNumericInput
          serviceData={data}
          min={0}
          max={50}
          name={convertToSnakeCase(name)}
          variant="contained-controls"
        />
      ) : (
        <Button
          className="flex items-center px-3 py-3"
          onClick={(e) => {
            e.preventDefault();
            onChangeNumberOfUnits();
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default ExtraDataField;
