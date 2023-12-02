import { reservationStatusMap } from '~/constants/mappings';
import { DETERGENT_COST } from '~/constants/primitives';

import type { Employee } from '~/schemas/api/employee';
import type {
  Visit,
  VisitPart,
  VisitWithEmployees
} from '~/schemas/api/reservation';

import { Status } from '~/types/enums';

export function getVisitEmployees(visit: VisitWithEmployees) {
  const { visitParts } = visit;

  const uniqueEmployeeIds = new Set(
    visitParts.map((visitPart) => visitPart.employee.id)
  );

  return Array.from(uniqueEmployeeIds).map(
    (id) =>
      visitParts.find((visitPart) => visitPart.employee.id === id)!.employee
  );
}

export function getVisitStartEndDates(visit: Visit) {
  const visitParts = visit.visitParts.toSorted(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return {
    startDate: visitParts[0]!.startDate,
    endDate: visitParts.at(-1)!.endDate
  };
}

export function getVisitCost(visit: VisitWithEmployees) {
  const detergentsCost = visit.includeDetergents ? DETERGENT_COST : 0;

  return (
    detergentsCost +
    visit.visitParts.reduce((acc, visitPart) => acc + visitPart.cost, 0)
  );
}

export const getCumulatedStatus = (statuses: Status[]) => {
  if (statuses.includes(Status.TO_BE_CONFIRMED)) {
    return Status.TO_BE_CONFIRMED;
  }

  if (
    statuses.some((status) => status === Status.ACTIVE) &&
    !statuses.includes(Status.TO_BE_CONFIRMED) &&
    !statuses.includes(Status.TO_BE_CANCELLED)
  ) {
    return Status.ACTIVE;
  }

  if (statuses.some((status) => status === Status.TO_BE_CANCELLED)) {
    return Status.TO_BE_CANCELLED;
  }

  if (
    statuses.every(
      (status) => status === Status.CLOSED || status === Status.CANCELLED
    )
  ) {
    return Status.CLOSED;
  }

  return Status.UNKNOWN;
};

export const getStatusFromVisitParts = (visitParts: VisitPart[]) => {
  const statuses = visitParts.map((visitPart) => visitPart.status);

  return getCumulatedStatus(statuses);
};

export function getVisitStatusDescription(visit: VisitWithEmployees) {
  return reservationStatusMap.get(getStatusFromVisitParts(visit.visitParts));
}

export function getVisitPartStatusDescription(visitPart: VisitPart) {
  return reservationStatusMap.get(visitPart.status);
}

export const getEmployeeStatusFromVisit = (
  visit: VisitWithEmployees,
  employeeId: Employee['id']
) => {
  const employeeVisitParts = visit.visitParts.filter(
    (visitPart) => visitPart.employee.id === employeeId
  );

  return getStatusFromVisitParts(employeeVisitParts);
};

export const getVisitEmployeesWithStatuses = (visit: VisitWithEmployees) => {
  const employees = getVisitEmployees(visit);

  return employees.map((employee) => ({
    employee: employee,
    status: getEmployeeStatusFromVisit(visit, employee.id)
  }));
};
