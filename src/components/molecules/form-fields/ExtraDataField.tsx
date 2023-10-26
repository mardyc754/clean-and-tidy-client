import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { type ServiceWithUnit } from '~/api/schemas/services';
import { Button } from '~/components/atoms/buttons';

type ExtraDataFieldProps = {
  data: ServiceWithUnit;
  selected: boolean;
  onClick: VoidFunction;
};

const ExtraDataField = ({ data, selected, onClick }: ExtraDataFieldProps) => {
  const { name, unit } = data;
  const { name: unitName, price } = unit;
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
        // className="flex items-center px-3 py-3"
        className="flex items-center px-3 py-3"
        onClick={(e) => {
          e.preventDefault();
          onClick();
          /** */
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default ExtraDataField;
