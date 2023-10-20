import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type ServiceWithUnit } from '~/api/schemas/services';

import { Button } from '~/components/atoms/buttons';
import { NumericInput } from '~/components/atoms/forms';

type ExtraDataFieldProps = {
  data: ServiceWithUnit;
  name: string;
};

const ExtraDataField = ({ data, name }: ExtraDataFieldProps) => {
  const { name: serviceName, unit } = data;
  const { name: unitName, price } = unit;

  const [selected, setSelected] = useState(false);

  // TODO handle types
  const { watch, setValue, unregister } = useFormContext();
  const watchNumberOfUnits = watch(name);

  // enable numeric field on button click
  // or disable it when number of units becomes 0
  useEffect(() => {
    if (selected) {
      setValue(name, 1);
    } else {
      unregister(name);
    }
  }, [name, selected, setValue, unregister]);

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
        <p className="font-medium">{serviceName}</p>
        <p className="text-sm">{`${price} zł/${unitName}`}</p>
      </div>
      {selected ? (
        <NumericInput
          initialValue={1}
          name={name}
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
