import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type ServiceWithUnit } from '~/api/schemas/services';

import { Button } from '~/components/atoms/buttons';
import { convertToSnakeCase } from '~/utils/stringUtils';
import { NumericInput } from '~/components/atoms/forms';

type ExtraDataFieldProps = {
  data: ServiceWithUnit;
  // onChangeNumberOfUnits: VoidFunction;
};

const ExtraDataField = ({ data }: ExtraDataFieldProps) => {
  const { name, unit } = data;
  const { name: unitName, price } = unit;
  const fieldName = convertToSnakeCase(name);
  const [selected, setSelected] = useState(false);

  // TODO handle types
  const { watch, setValue, unregister } = useFormContext();
  const watchNumberOfUnits = watch(fieldName);

  // enable numeric field on button click
  // or disable it when number of units becomes 0
  useEffect(() => {
    if (selected) {
      setValue(fieldName, 1);
    } else {
      unregister(fieldName);
    }
  }, [fieldName, selected, setValue, unregister]);

  // or disable it when number of units becomes 0
  useEffect(() => {
    if (watchNumberOfUnits === 0) {
      setSelected(false);
    }
  }, [watchNumberOfUnits]);

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
        <NumericInput
          initialValue={1}
          // serviceData={data}
          name={fieldName}
          min={0}
          max={50}
          variant="contained-controls"
        />
      ) : (
        <Button
          className="flex items-center px-3 py-3"
          onClick={(e) => {
            e.preventDefault();
            setSelected(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default ExtraDataField;
