import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import type { Employee } from '~/schemas/api/employee';

import { Button } from '~/components/atoms/buttons';

import DataTable from './DataTable';

function createEmployeeRows(data: Employee[]) {
  return data.map((employee) => {
    return {
      id: employee.id,
      employeeFullName: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
      phone: employee.phone ? employee.phone : '---',
      isAdmin: employee.isAdmin ? 'Yes' : 'No',
      actions: (
        <Button href={`/admin/employees/${employee.id}/change`}>Manage</Button>
      )
    };
  });
}

interface EmployeeTableProps {
  data: Employee[];
}

const EmployeeTable = ({ data }: EmployeeTableProps) => {
  const columns = ['Id', 'Employee', 'Email', 'Phone', 'Is admin', 'Actions'];

  return (
    <DataTable
      name="employeeTable"
      columns={columns}
      rows={createEmployeeRows(data)}
      leftButtonSlot={
        <Button
          className="flex items-center justify-center space-x-1"
          href="/admin/employees/create"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add employee</span>
        </Button>
      }
    />
  );
};

export default EmployeeTable;
