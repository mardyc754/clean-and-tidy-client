import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type ServiceWithUnit } from '~/api/schemas/services';

import { Button } from '~/components/atoms/buttons';

type ExtraDataFieldProps = {
  data: ServiceWithUnit;
  selected: boolean;
  onChangeCostAndDuration: (cost: number, duration: number) => void;
};

const ExtraDataField = ({
  data,
  selected,
  onChangeCostAndDuration
}: ExtraDataFieldProps) => {
  const { name, unit } = data;
  const { name: unitName, price, duration } = unit;

  return (
    <div
      className={`flex items-center justify-between rounded-lg px-5 py-4 shadow-md focus:outline-none ${
        selected ? 'bg-cyan-500' : 'bg-white'
      }`}
    >
      <div className="flex flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm">{`${price}/${unitName}`}</p>
      </div>
      <Button
        className="flex items-center px-3 py-3"
        onClick={(e) => {
          e.preventDefault();
          onChangeCostAndDuration(price, duration);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default ExtraDataField;
