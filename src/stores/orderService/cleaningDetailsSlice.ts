import { omit } from 'lodash';
import { type StateCreator } from 'zustand';

import { initialCleaningDetailsFormData } from '~/constants/orderServiceForm';

import {
  type BasicServiceData,
  type OrderedService,
  type Service
} from '~/schemas/api/services';
import type {
  EmployeeAvailabilityData,
  OrderServiceInputData,
  Timeslot
} from '~/schemas/forms/orderService';

import {
  advanceByMinutes,
  getTimeSlot,
  mergeDayDateAndHourDate
} from '~/utils/dateUtils';
import { timeslotsIntersection } from '~/utils/serviceUtils';

import type { CleaningFrequency } from '~/types/enums';
import type { CleaningFrequencyData, ValidDate } from '~/types/forms';

import {
  assignEmployeesToServices,
  calculateServiceNumberOfUnits,
  calculateVisitCostAndDuration,
  createOrUpdateOrderedService,
  isEmployeeAvailableInAGivenDay,
  resetAssignedEmployees
} from './utils';

type StoredDate = ValidDate | string;

interface CleaningDetailsSliceData {
  totalCost: number;
  durationInMinutes: number;
  includeDetergents: boolean;
  detergentsCost: number;
  // dates coming from the local storage are stored as ISO strings
  // in order not to mix the Date and string types together,
  // we convert the ISO strings to Date objects
  startDate: StoredDate;
  hourDate: StoredDate;
  orderedServices: (OrderedService | undefined)[];
  cleaningFrequencyDisplayData: CleaningFrequencyData | null;
}
export interface CleaningDetailsSlice extends CleaningDetailsSliceData {
  availableEmployees: EmployeeAvailabilityData[];
  isReservationAvailable: boolean;
  onChangeServiceNumberOfUnits: (
    numberOfUnits: number,
    isMainService: boolean,
    serviceData: BasicServiceData,
    positionOnList: number
  ) => void;
  onChangeDetergentsCost: (detergentsCost: number) => void;
  onChangeStartDate: (startDate: ValidDate) => void;
  onChangeHourDate: (hourDate: ValidDate) => void;
  fullStartDate: () => StoredDate;
  getServiceById: (id: BasicServiceData['id']) => OrderedService | undefined;
  removeService: (id: BasicServiceData['id']) => void;
  onChangeCleaningFrequency: (
    cleaningFrequency: CleaningFrequency,
    availableFrequencies: CleaningFrequencyData[]
  ) => void;
  endDate: () => ValidDate;
  getInitialCleaningDetailsFormData: () => OrderServiceInputData;
  getOrderedServicesIds: () => Array<Service['id']>;
  resetCleaningDetailsData: () => void;
  setAvailableEmployees: (employees: EmployeeAvailabilityData[]) => void;
  getAvailableEmployeesForService: (
    serviceId: Service['id']
  ) => EmployeeAvailabilityData[];
  canAddMoreServices: (busyHours: Timeslot[]) => boolean;
  getAssignedEmployees: () => EmployeeAvailabilityData[];
}

const checkReservationAvailability = (
  startDate: StoredDate,
  hourDate: StoredDate,
  orderedServices: (OrderedService | undefined)[],
  employees: EmployeeAvailabilityData[]
) => {
  return (
    !!startDate &&
    !!hourDate &&
    orderedServices
      .filter((service) => !!service)
      .every(
        (service) =>
          !!service?.visitParts.every((visitPart) => {
            return (
              visitPart.employeeId !== undefined &&
              isEmployeeAvailableInAGivenDay(
                visitPart.employeeId,
                employees,
                orderedServices,
                new Date(startDate)
              )
            );
          })
      )
  );
};

export const initialCleaningDetailsState = {
  ...omit(initialCleaningDetailsFormData, ['extraServices']),
  totalCost: 0,
  durationInMinutes: 0,
  detergentsCost: 0,
  orderedServices: [],
  cleaningFrequencyDisplayData: null
};

export const createCleaningDetailsSlice: StateCreator<CleaningDetailsSlice> = (
  set,
  get
) => ({
  ...initialCleaningDetailsState,
  availableEmployees: [],
  detergentsCost: 0,
  isReservationAvailable: false,
  onChangeDetergentsCost: (detergentsCost) => {
    set(() => ({
      detergentsCost: detergentsCost >= 0 ? detergentsCost : 0,
      includeDetergents: detergentsCost >= 0
    }));
  },
  onChangeServiceNumberOfUnits: (
    numberOfUnits,
    isMainService,
    serviceData,
    positionOnList
  ) => {
    set((state) => {
      let newServices = createOrUpdateOrderedService(
        serviceData,
        state.orderedServices,
        isMainService,
        numberOfUnits,
        positionOnList
      );

      if (!serviceData.unit) {
        newServices[positionOnList] = {
          ...serviceData,
          isMainServiceForReservation: isMainService,
          visitParts: []
        };
      }

      const fullDate = get().fullStartDate();

      if (fullDate) {
        newServices = assignEmployeesToServices(
          state.availableEmployees,
          newServices,
          new Date(fullDate)
        );
      }

      return {
        orderedServices: newServices,
        ...calculateVisitCostAndDuration(newServices),
        isReservationAvailable: checkReservationAvailability(
          state.startDate,
          state.hourDate,
          newServices,
          state.availableEmployees
        )
      };
    });
  },
  removeService: (id) => {
    set((state) => {
      const oldServiceIndex = state.orderedServices.findIndex(
        (service) => service?.id === id
      );

      const newServices = [...state.orderedServices];

      newServices[oldServiceIndex] = undefined;

      return {
        orderedServices: newServices
      };
    });
  },
  getServiceById: (id) =>
    get().orderedServices.find((service) => id === service?.id),
  endDate: () => {
    const fullStartDate = get().fullStartDate();

    return fullStartDate
      ? advanceByMinutes(fullStartDate as Date, get().durationInMinutes)
      : null;
  },
  fullStartDate: () => {
    const startDate = get().startDate;
    const hourDate = get().hourDate;

    if (!startDate && !hourDate) {
      return null;
    }

    if (!startDate) {
      return hourDate;
    }

    if (!hourDate) {
      return startDate;
    }

    return mergeDayDateAndHourDate(new Date(startDate), new Date(hourDate));
  },
  onChangeCleaningFrequency: (cleaningFrequency, availableFrequencies) => {
    set((state) => ({
      cleaningFrequencyDisplayData:
        availableFrequencies.find(
          (frequency) => cleaningFrequency === frequency.value
        ) ?? null,
      hourDate: null,
      orderedServices: resetAssignedEmployees(state.orderedServices),
      isReservationAvailable: checkReservationAvailability(
        state.startDate,
        null,
        state.orderedServices,
        state.availableEmployees
      )
    }));
  },
  onChangeStartDate: (startDate) => {
    set((state) => {
      return {
        startDate,
        hourDate: null,
        orderedServices: resetAssignedEmployees(state.orderedServices),
        isReservationAvailable: checkReservationAvailability(
          startDate,
          null,
          state.orderedServices,
          state.availableEmployees
        )
      };
    });
  },
  onChangeHourDate: (hourDate) => {
    set((state) => {
      const fullDate = get().fullStartDate();

      const newOrderedServices =
        state.startDate && hourDate && fullDate
          ? assignEmployeesToServices(
              state.availableEmployees,
              state.orderedServices,
              mergeDayDateAndHourDate(
                new Date(state.startDate),
                new Date(hourDate)
              )
            )
          : resetAssignedEmployees(state.orderedServices);

      return {
        hourDate,
        isReservationAvailable: checkReservationAvailability(
          state.startDate,
          hourDate,
          newOrderedServices,
          state.availableEmployees
        ),
        orderedServices: newOrderedServices
      };
    });
  },
  getInitialCleaningDetailsFormData: () => {
    const {
      orderedServices,
      cleaningFrequencyDisplayData,
      startDate,
      hourDate,
      includeDetergents,
      detergentsCost,
      totalCost
    } = get();

    return {
      numberOfUnits: calculateServiceNumberOfUnits(
        orderedServices.find((service) => service?.isMainServiceForReservation)
      ),
      cleaningFrequency: cleaningFrequencyDisplayData?.value ?? null,
      startDate: startDate ? new Date(startDate) : null,
      hourDate: hourDate ? new Date(hourDate) : null,
      extraServices:
        orderedServices.map((service) =>
          !service ? service : calculateServiceNumberOfUnits(service)
        ) ?? [],
      totalCost,
      includeDetergents,
      detergentsCost: includeDetergents ? detergentsCost : 0
    };
  },
  resetCleaningDetailsData: () => {
    set({
      ...initialCleaningDetailsState
    });
  },
  getOrderedServicesIds: () =>
    (
      get().orderedServices.filter((service) => !!service) as OrderedService[]
    ).map((service) => service.id),
  setAvailableEmployees: (employees) => {
    set(() => ({ availableEmployees: employees }));
  },
  getAvailableEmployeesForService: (serviceId) =>
    get().availableEmployees.filter((employee) =>
      employee.services.includes(serviceId)
    ),
  canAddMoreServices: (busyHours) => {
    const { startDate, hourDate } = get();

    if (!startDate || !hourDate) {
      return true;
    }

    const fullStartDate = mergeDayDateAndHourDate(
      new Date(startDate),
      new Date(hourDate)
    );

    if (!fullStartDate) {
      return false;
    }

    const duration = get().durationInMinutes;
    const timeslot = getTimeSlot(fullStartDate, duration);

    return timeslotsIntersection([busyHours, [timeslot]]).length === 0;
  },
  getAssignedEmployees: () => {
    const { orderedServices, availableEmployees } = get();

    const nonEmptyVisitParts = orderedServices.flatMap((service) =>
      service?.visitParts.filter((visitPart) => visitPart.numberOfUnits > 0)
    );

    const employeesInVisitPart = Array.from(
      new Set(nonEmptyVisitParts.map((visitPart) => visitPart?.employeeId))
    ).filter((employeeId) => employeeId !== undefined);

    const assignedEmployees = availableEmployees.filter((employee) =>
      employeesInVisitPart.includes(employee.id)
    );

    return assignedEmployees;
  }
});
