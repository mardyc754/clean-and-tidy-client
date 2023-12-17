import * as React from 'react';

import type { Employee } from '~/schemas/api/employee';

import { ManageEmployeeDialog } from '../dialogs';
import DataTable from './DataTable';

function createEmployeeRows(data: Employee[]) {
  return data.map((employee) => {
    return {
      id: employee.id,
      employeeFullName: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
      phone: employee.phone ? employee.phone : '---',
      isAdmin: employee.isAdmin ? 'Yes' : 'No',
      actions: <ManageEmployeeDialog employeeData={employee} />
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
    />
  );
};

export default EmployeeTable;
