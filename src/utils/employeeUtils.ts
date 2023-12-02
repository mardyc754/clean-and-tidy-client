import type { Employee } from '~/schemas/api/employee';

import { displayDatesAsTimeslot } from '~/utils/dateUtils';

export function createEmployeeRows(data: Employee[]) {
  return data.map((employee) => {
    return {
      id: employee.id,
      employeeFullName: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
      workingHours: displayDatesAsTimeslot(
        employee.startHour,
        employee.endHour
      ),
      // isAdmin: employee.isAdmin
      isAdmin: employee.isAdmin ? 'Yes' : 'No'
    };
  });
}
