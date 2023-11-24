import { useQuery } from '@tanstack/react-query';

import { employee } from '~/constants/queryKeys';

import { getEmployeesWorkingHours } from '~/api/employee';

import { type Timespan } from '~/schemas/common';

import { displayDateWithHours, isAfter } from '~/utils/dateUtils';

const calculateBusyHours = (allEmployeeWorkingHours: Timespan[][]) => {
  let busyHours = allEmployeeWorkingHours[0] ?? [];

  allEmployeeWorkingHours.slice(1).forEach((singleEmployeeWorkingHours) => {
    const newBusyHours: Timespan[] = [];

    // check the hour conflicts between employees
    // by comparing employee working hours with the rest of the employees
    singleEmployeeWorkingHours.forEach((timespan) => {
      const conflicts = busyHours.filter(
        (busyTimespan) =>
          // four cases:
          // - timespan starts before and finishes while busy
          // - timespan is contained inside busy timespan
          // - busy timespan contains timespan
          // - timespan starts while busy and finishes after
          isAfter(timespan.end, busyTimespan.start) &&
          isAfter(busyTimespan.end, timespan.start)
      );

      conflicts.forEach((conflict) => {
        newBusyHours.push({
          start: isAfter(timespan.start, conflict.start)
            ? timespan.start
            : conflict.start,
          end: isAfter(timespan.end, conflict.end) ? conflict.end : timespan.end
        });
      });
    });

    busyHours = [...newBusyHours];
  });

  return busyHours;
};

// TODO: Maybe it can be connected with the useCleaningDetailsForm hook?
export function useEmployeeWorkingHours(serviceId: number) {
  const { data: employeesWithWorkingHours, isSuccess } = useQuery({
    queryKey: employee.workingHours(serviceId),
    queryFn: () => getEmployeesWorkingHours(serviceId)
  });

  const busyHours = calculateBusyHours(
    employeesWithWorkingHours?.map(({ workingHours }) => workingHours) ?? []
  );

  console.log(
    busyHours.map(({ start, end }) => ({
      start: displayDateWithHours(start),
      end: displayDateWithHours(end)
    }))
  );

  return { employeesWithWorkingHours };
}
