import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import type { Service } from '~/schemas/api/services';

import { Button } from '~/components/atoms/buttons';

import { getLabelForServiceUnit } from '~/utils/serviceUtils';

import { ManageServiceButton } from '../dialogs';
import DataTable from './DataTable';

function createServiceRows(data: Service[]) {
  return data.map((service) => {
    const { id, name, unit, isPrimary } = service;
    return {
      id,
      name,
      pricePerUnit: getLabelForServiceUnit(service),
      isPrimary: isPrimary ? 'Yes' : 'No',
      actions: unit ? <ManageServiceButton serviceData={service} /> : <></>
    };
  });
}

interface ServiceTableProps {
  data: Service[];
}

const ServiceTable = ({ data }: ServiceTableProps) => {
  const columns = ['Id', 'Name', 'Price/unit', 'Is primary', 'Actions'];

  return (
    <DataTable
      name="serviceTable"
      columns={columns}
      rows={createServiceRows(data)}
      leftButtonSlot={
        <Button
          className="flex items-center justify-center space-x-1"
          href="/admin/services/create"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add service</span>
        </Button>
      }
    />
  );
};

export default ServiceTable;
