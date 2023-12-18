import * as React from 'react';

import type { Service } from '~/schemas/api/services';

import { getLabelForServiceUnit } from '~/utils/serviceUtils';

import { ManageServiceButton } from '../dialogs';
import DataTable from './DataTable';

function createServiceRows(data: Service[]) {
  return data.map((service) => {
    const { id, name, unit } = service;
    return {
      id,
      name,
      pricePerUnit: getLabelForServiceUnit(service),
      actions: unit ? <ManageServiceButton serviceData={service} /> : <></>
    };
  });
}

interface ServiceTableProps {
  data: Service[];
}

const ServiceTable = ({ data }: ServiceTableProps) => {
  const columns = ['Id', 'Name', 'Price/unit', 'Actions'];

  return (
    <DataTable
      name="serviceTable"
      columns={columns}
      rows={createServiceRows(data)}
      // leftButtonSlot={
      //   <Button
      //     className="flex items-center justify-center space-x-1"
      //     href="/employee/create"
      //   >
      //     <FontAwesomeIcon icon={faPlus} />
      //     <span>Add employee</span>
      //   </Button>
      // }
    />
  );
};

export default ServiceTable;
