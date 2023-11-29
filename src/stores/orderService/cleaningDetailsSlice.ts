import { omit } from 'lodash';
import { type StateCreator } from 'zustand';

import { initialCleaningDetailsFormData } from '~/constants/orderServiceForm';
import { DETERGENT_COST } from '~/constants/primitives';

import type { Employee } from '~/schemas/api/employee';
import {
  type BasicServiceData,
  type OrderedService,
  Service
} from '~/schemas/api/services';
import type {
  EmployeeAvailabilityData,
  OrderServiceInputData
} from '~/schemas/forms/orderService';

import {
  advanceByMinutes,
  getTimeSlot,
  mergeDayDateAndHourDate
} from '~/utils/dateUtils';

import type { CleaningFrequency } from '~/types/enums';
import type { CleaningFrequencyData, ValidDate } from '~/types/forms';

import {
  calculateServiceNumberOfUnits,
  calculateTotalCostAndDuration,
  createOrUpdateOrderedService,
  getAssignedEmployees
} from './utils';

type StoredDate = ValidDate | string;

interface CleaningDetailsSliceData {
  totalCost: number;
  durationInMinutes: number;
  includeDetergents: boolean;
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
  assignedEmployees: Employee['id'][];
  onChangeServiceNumberOfUnits: (
    numberOfUnits: number,
    isMainService: boolean,
    serviceData: BasicServiceData,
    positionOnList: number,
    employeeId: number
  ) => void;
  onChangeIncludeDetergents: (includeDetergents: boolean) => void;
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
  calculateAssignedEmployees: () => Employee['id'][];
}

export const initialCleaningDetailsState = {
  ...omit(initialCleaningDetailsFormData, ['extraServices']),
  totalCost: 0,
  durationInMinutes: 0,
  orderedServices: [],
  cleaningFrequencyDisplayData: null
};

export const createCleaningDetailsSlice: StateCreator<CleaningDetailsSlice> = (
  set,
  get
) => ({
  ...initialCleaningDetailsState,
  availableEmployees: [],
  assignedEmployees: [],
  onChangeIncludeDetergents: (includeDetergents) => {
    set((state) => ({
      includeDetergents,
      totalCost: includeDetergents
        ? state.totalCost + DETERGENT_COST
        : state.totalCost - DETERGENT_COST
    }));
  },
  onChangeServiceNumberOfUnits: (
    numberOfUnits,
    isMainService,
    serviceData,
    positionOnList,
    employeeId
  ) => {
    set((state) => {
      const newService = createOrUpdateOrderedService(
        serviceData,
        employeeId,
        state.orderedServices,
        isMainService,
        numberOfUnits
      );

      const newServices = [...state.orderedServices];

      const newServiceNumberOfUnits = calculateServiceNumberOfUnits(newService);

      newServices[positionOnList] =
        newServiceNumberOfUnits > 0 ? newService : undefined;

      return {
        orderedServices: newServices,
        assignedEmployees: state.calculateAssignedEmployees(),
        ...calculateTotalCostAndDuration(newServices)
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
    set(() => ({
      cleaningFrequencyDisplayData:
        availableFrequencies.find(
          (frequency) => cleaningFrequency === frequency.value
        ) ?? null
    }));
  },
  onChangeStartDate: (startDate) => {
    set((state) => ({
      startDate,
      hourDate: null,
      assignedEmployees: state.calculateAssignedEmployees()
    }));
  },
  onChangeHourDate: (hourDate) => {
    set(() => ({ hourDate }));
  },
  getInitialCleaningDetailsFormData: () => {
    const {
      orderedServices,
      cleaningFrequencyDisplayData,
      startDate,
      hourDate,
      includeDetergents,
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
      includeDetergents
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
  calculateAssignedEmployees: () => {
    const { startDate, durationInMinutes, availableEmployees } = get();
    return getAssignedEmployees(
      availableEmployees,
      getTimeSlot(startDate, durationInMinutes)
    );
  }
});
