import type { Employee } from '~/schemas/api/employee';

import { useServices } from '~/hooks/adminForms/useServices';

import { DialogTriggerButton } from '.';
import { ChangeEmployeeDataForm } from '../forms';

interface ManageEmployeeDialogProps {
  employeeData: Employee;
}

const ManageEmployeeDialog = ({ employeeData }: ManageEmployeeDialogProps) => {
  const { services } = useServices({ includeEmployees: true });

  return (
    <DialogTriggerButton
      className="sm:max-w-[40vw]"
      dialogTitle="Manage employee"
      buttonLabel="Manage"
      actions={[
        {
          children: 'Save changes',
          type: 'submit'
        }
      ]}
    >
      <ChangeEmployeeDataForm
        employeeData={employeeData}
        serviceData={services ?? []}
      />
    </DialogTriggerButton>
  );
};

export default ManageEmployeeDialog;
