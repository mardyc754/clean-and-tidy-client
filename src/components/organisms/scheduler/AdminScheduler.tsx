import { useMemo, useState } from 'react';

import type { EmployeeWithVisits } from '~/schemas/api/reservation';

import { useAuth } from '~/hooks/auth/useAuth';

import { LabeledDropdown } from '~/components/molecules/form-fields';

import { daysBetween } from '~/utils/dateUtils';
import { getMaxEndDateFromReservationVisits } from '~/utils/scheduler';

import Scheduler, { type SchedulerProps, type VisitEvent } from './Scheduler';

export type EmployeeWithVisitEvents = Omit<EmployeeWithVisits, 'visitParts'> & {
  visits: VisitEvent[];
};

type AdminSchedulerProps = {
  employeeList: EmployeeWithVisitEvents[];
} & Omit<SchedulerProps, 'length'>;

const AdminScheduler = ({ employeeList, ...props }: AdminSchedulerProps) => {
  const { currentUser } = useAuth();

  const dropdownOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: `${currentUser?.id}`,
      name: `You`
    },
    ...employeeList
      .filter((employee) => employee.id !== currentUser?.id)
      .map((employee) => ({
        id: `${employee.id}`,
        name: `${employee.firstName} ${employee.lastName}`
      }))
  ];
  const [selectedEmployee, setSelectedEmployee] = useState(dropdownOptions[0]!);

  const visits = useMemo(() => {
    const visits = employeeList
      .filter((employee) =>
        selectedEmployee.id === 'all'
          ? true
          : selectedEmployee.id === `${employee.id}`
      )
      .flatMap((employee) => employee.visits);
    return visits;
  }, [employeeList, selectedEmployee]);

  const reservationsTimeslot = useMemo(() => {
    if (!visits) return;

    return daysBetween(getMaxEndDateFromReservationVisits(visits), new Date());
  }, [visits]);

  return (
    <>
      <div className="flex justify-end py-4">
        <LabeledDropdown
          label="Show events for"
          options={dropdownOptions}
          value={selectedEmployee}
          onChange={(value) => setSelectedEmployee(value)}
        />
      </div>
      <Scheduler {...props} events={visits} length={reservationsTimeslot} />;
    </>
  );
};

export default AdminScheduler;
