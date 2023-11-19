import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '~/components/shadcn/ui/dropdown-menu';

import TableRowDropdown from './TableRowDropdown';

interface TableRowDropdownProps {
  children: React.ReactNode;
}

const ManageEmployeeDropdown = () => {
  return (
    <TableRowDropdown>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
      // onClick={() => navigator.clipboard.writeText(payment.id)}
      >
        Set employee as admin
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Manage employee services</DropdownMenuItem>
      <DropdownMenuItem>Remove employee</DropdownMenuItem>
    </TableRowDropdown>
  );
};

export default ManageEmployeeDropdown;
