import React, { useEffect, useState } from 'react';

import { Button } from '~/components/atoms/buttons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/shadcn/ui/table';

interface DataTableProps {
  columns: string[];
  name: string;
  rows: Record<string, React.ReactNode>[];
  rowsPerPage?: number;
  leftButtonSlot?: React.ReactNode;
}

const DataTable = ({
  name,
  columns,
  rows,
  rowsPerPage = 5,
  leftButtonSlot
}: DataTableProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [currentRows, setCurrentRows] = useState<
    Record<string, React.ReactNode>[]
  >(rows.slice(0, rowsPerPage));

  useEffect(() => {
    setCurrentRows(
      rows.slice(
        currentPageIndex * rowsPerPage,
        (currentPageIndex + 1) * rowsPerPage
      )
    );
  }, [currentPageIndex, rows, rowsPerPage]);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="bg-white">
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
            {currentRows.length ? (
              currentRows.map((row, index) => (
                <TableRow key={`${name}-row-body-${index}`}>
                  {Object.values(row).map((cell, i) => (
                    <TableCell key={`${name}-row-body-${index}-cell-${i}`}>
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
      <div className="flex justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">{leftButtonSlot}</div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setCurrentPageIndex((prev) => prev - 1)}
            disabled={currentPageIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPageIndex((prev) => prev + 1)}
            disabled={currentPageIndex === totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
