import type { Employee } from '~/schemas/api/employee';

import { EmployeeDataField } from '~/components/organisms/button-fields';

import ListWrapper from '../wrappers/ListWrapper';

interface EmployeeListProps {
  data: Employee[];
}

const EmployeeList = ({ data }: EmployeeListProps) => {
  return (
    <ListWrapper
      component="h2"
      contentWrapperClasses="flex w-full flex-col space-y-4 pt-8"
      title="Employee list"
    >
      {data.map((employee) => (
        <EmployeeDataField data={employee} key={`Employee-${employee.id}`} />
      ))}
    </ListWrapper>
  );
};

export default EmployeeList;
