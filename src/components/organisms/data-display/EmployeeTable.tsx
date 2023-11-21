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

import { displayDatesAsTimespan } from '~/utils/dateUtils';

import { ManageEmployeeDialog } from '../dialogs';

function createEmployeeRows(data: Employee[]) {
  return data.map((employee) => {
    return {
      id: employee.id,
      employeeFullName: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
      workingHours: displayDatesAsTimespan(
        employee.startHour,
        employee.endHour
      ),
      // isAdmin: employee.isAdmin
      isAdmin: employee.isAdmin ? 'Yes' : 'No'
    };
  });
}

interface EmployeeTableProps {
  data: Employee[];
}

const EmployeeTable = ({ data }: EmployeeTableProps) => {
  const columns = [
    'Id',
    'Employee',
    'Email',
    'Working hours',
    'Is admin',
    'Actions'
  ];

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
              rows.map((row, index) => (
                <TableRow key={`employeeList-row-body-${row.id}`}>
                  {Object.values(row).map((cell, i) => (
                    <TableCell
                      key={`employeeList-row-body-${row.id}-cell-${i}`}
                    >
                      {cell}
                    </TableCell>
                  ))}
                  <TableCell>
                    <ManageEmployeeDialog employeeData={data[index]!} />
                  </TableCell>
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

// return (
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <Button variant="ghost" className="h-8 w-8 p-0">
//         <span className="sr-only">Open menu</span>
//         <DotsHorizontalIcon className="h-4 w-4" />
//       </Button>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent align="end">
//       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//       <DropdownMenuItem
//         onClick={() => navigator.clipboard.writeText(payment.id)}
//       >
//         Copy payment ID
//       </DropdownMenuItem>
//       <DropdownMenuSeparator />
//       <DropdownMenuItem>View customer</DropdownMenuItem>
//       <DropdownMenuItem>View payment details</DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>
// );
