import { useFloating } from '@floating-ui/react-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { type ServiceWithUnit } from '~/schemas/api/services';

import { Button } from '~/components/atoms/buttons';
import { NumericInput } from '~/components/atoms/forms';

type ExtraDataFieldProps = {
  data: ServiceWithUnit;
  name: string;
  defaultValue?: number;
  onChangeNumberOfUnits: (value: number) => void;
  disabled?: boolean;
};

const ExtraDataField = ({
  data,
  name,
  defaultValue,
  disabled = false,
  onChangeNumberOfUnits
}: ExtraDataFieldProps) => {
  const { name: serviceName, unit } = data;

  const [selected, setSelected] = useState(!!defaultValue);

  const { setValue } = useFormContext();
  const currentNumberOfUnits = useWatch({ name }) as number;
  // enable numeric field on button click
  // or disable it when number of units becomes 0
  useEffect(() => {
    if (selected) {
      setValue(name, defaultValue ? defaultValue : 1); // set the value to 1 if increase from 0 or undefined
      onChangeNumberOfUnits(defaultValue ? defaultValue : 1);
    } else {
      setValue(name, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // or disable it when number of units becomes 0
  useEffect(() => {
    if (currentNumberOfUnits === 0) {
      setSelected(false);
    }
  }, [currentNumberOfUnits]);

  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-white px-5 py-4 shadow-md focus:outline-none`}
    >
      <div
        className={`flex flex-col 
        `}
      >
        <p className={clsx('font-medium', disabled && 'text-slate-400')}>
          {serviceName}
        </p>
        {unit && (
          <p
            className={clsx('text-sm', disabled && 'text-slate-400')}
          >{`${unit.price} zł/${unit.shortName}`}</p>
        )}
      </div>
      {selected ? (
        <NumericInput
          initialValue={defaultValue}
          name={name}
          min={0}
          max={50}
          variant="contained-controls"
          onChange={onChangeNumberOfUnits}
        />
      ) : (
        <div>
          <Button
            className="flex h-auto items-center rounded-full p-3"
            onClick={(e) => {
              e.preventDefault();
              setSelected(true);
            }}
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExtraDataField;
