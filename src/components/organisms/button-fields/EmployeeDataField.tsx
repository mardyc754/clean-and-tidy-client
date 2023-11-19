import type { Employee } from '~/schemas/api/employee';

import SectionWithButton from './SectionWithButton';

interface EmployeeDataFieldProps {
  data: Employee;
}

const EmployeeDataField = ({ data }: EmployeeDataFieldProps) => {
  return (
    <SectionWithButton
      label={`${data.firstName} ${data.lastName}`}
      buttonProps={{ content: 'Manage' }}
    />
  );
};

export default EmployeeDataField;
