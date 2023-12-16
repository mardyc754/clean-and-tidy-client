import * as React from 'react';

import type { Employee } from '~/schemas/api/employee';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/shadcn/ui/table';

import { displayDatesAsTimeslot } from '~/utils/dateUtils';

import { ManageEmployeeDialog } from '../dialogs';

function createEmployeeRows(data: Employee[]) {
  return data.map((employee) => {
    return {
      id: employee.id,
      employeeFullName: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
      phone: employee.phone ? employee.phone : '---',
      // isAdmin: employee.isAdmin
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

  const rows = createEmployeeRows(data);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((columnName, i) => {
                return (
                  <TableHead key={`employeeTable-row-header-${i}`}>
                    {columnName}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.length ? (
              rows.map((row) => (
                <TableRow key={`employeeList-row-body-${row.id}`}>
                  {Object.values(row).map((cell, i) => (
                    <TableCell
                      key={`employeeList-row-body-${row.id}-cell-${i}`}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeTable;
