import type { AllEmployeesQueryOptions } from '~/api/employee';
import type {
  AllServicesQueryOptions,
  EmployeeBusyHoursQueryOptions,
  ReservationQueryOptions,
  ServiceBusyHoursQueryOptions,
  ServiceQueryOptions,
  VisitQueryOptions
} from '~/api/types';

import type { Reservation, Visit } from '~/schemas/api/reservation';

import type { Status } from '~/types/enums';

// example query key factory
//
// const todoKeys = {
//   all: ['todos'] as const,
//   lists: () => [...todoKeys.all, 'list'] as const,
//   list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
//   details: () => [...todoKeys.all, 'detail'] as const,
//   detail: (id: number) => [...todoKeys.details(), id] as const
// };

export const user = ['user'];

export const employee = {
  all: ['employees'] as const,
  filters: (filters?: AllEmployeesQueryOptions) =>
    [...employee.all, 'filters', { filters }] as const,
  workingHours: (options: EmployeeBusyHoursQueryOptions) =>
    [...employee.all, 'workingHours', { ...options }] as const,
  find: (id: number) => [...employee.all, { id }] as const,
  findServices: (id: number) => [...employee.find(id), 'services'] as const
};

export const reservation = {
  all: ['reservations'] as const,
  find: () => [...reservation.all, 'find'] as const,
  byName: (reservationName: Reservation['name']) =>
    [
      ...reservation.find(),
      reservationName,
      {
        includeVisits: true,
        includeServices: true,
        includeAddress: true
      }
    ] as const,
  client: (email: string) =>
    [...reservation.find(), 'client', { email }] as const,
  employee: (id: number) =>
    [...reservation.find(), 'employee', { id }] as const,
  employeeWithStatus: (id: number, status: Status) =>
    [...reservation.employee(id), { status }] as const,
  lists: () => [...reservation.all, 'list'] as const,
  list: (filters: string) => [...reservation.lists(), { filters }] as const,
  details: () => [...reservation.all, 'detail'] as const,
  detail: (name: string, options?: ReservationQueryOptions) =>
    [...reservation.details(), name, options] as const
};

export const visit = {
  all: ['visits'] as const,
  find: () => [...visit.all, 'find'] as const,
  lists: () => [...visit.all, 'list'] as const,
  client: (id: number) => [...visit.find(), 'client', { id }] as const,
  employee: (id: number) => [...visit.find(), 'employee', id] as const,
  list: (filters: string) => [...visit.lists(), { filters }] as const,
  details: () => [...visit.all, 'detail'] as const,
  detail: (id: number, options?: VisitQueryOptions) =>
    [...visit.details(), id, { options }] as const,
  reservationVisitDetail: (id: number) =>
    [...reservation.details(), ...visit.detail(id)] as const,
  change: (id: Visit['id']) => [...visit.detail(id), 'change'] as const
};

export const service = {
  all: ['services'] as const,
  filter: (filters?: ServiceQueryOptions | AllServicesQueryOptions) =>
    [...service.all, 'filter', { filters }] as const,
  find: (id: number) => [...service.all, 'find', { id }] as const,
  workingHours: (options: ServiceBusyHoursQueryOptions) =>
    [...service.all, 'workingHours', { ...options }] as const,
  employees: () => [...service.all, 'employees'] as const,
  employeesWithFilters: (
    filters?: ServiceQueryOptions | AllServicesQueryOptions
  ) => [...service.filter(filters), 'employees'] as const,
  singleServiceEmployees: (id: number) =>
    [...service.find(id), 'employees'] as const
};
