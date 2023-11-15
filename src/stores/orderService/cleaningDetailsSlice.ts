import { type StateCreator } from 'zustand';

import { DETERGENT_COST } from '~/constants/primitives';

import type {
  BasicServiceData,
  OrderedService,
  Service
} from '~/schemas/api/services';
import type { OrderServiceInputData } from '~/schemas/forms/orderService';

import { advanceByMinutes, mergeDayDateAndHourDate } from '~/utils/dateUtils';

import type { CleaningFrequency } from '~/types/enums';
import type { CleaningFrequencyData, ValidDate } from '~/types/forms';

import {
  calculateTotalCostAndDuration,
  createOrUpdateOrderedService
} from './utils';

export interface CleaningDetailsSlice {
  totalCost: number;
  durationInMinutes: number;
  includeDetergents: boolean;
  startDate: ValidDate;
  hourDate: ValidDate;
  orderedServices: OrderedService[];
  cleaningFrequencyDisplayData: CleaningFrequencyData | null;
  onChangeServiceNumberOfUnits: (
    numberOfUnits: number,
    isMainService: boolean,
    serviceData: BasicServiceData
  ) => void;
  onChangeIncludeDetergents: (includeDetergents: boolean) => void;
  onChangeStartDate: (startDate: ValidDate) => void;
  onChangeHourDate: (hourDate: ValidDate) => void;
  fullStartDate: () => ValidDate;
  setData: (formData: OrderServiceInputData, serviceData: Service) => void;
  getServiceById: (id: BasicServiceData['id']) => OrderedService | undefined;
  getServiceNumberOfUnits: (id: BasicServiceData['id']) => number;
  removeService: (id: BasicServiceData['id']) => OrderedService[];
  onChangeCleaningFrequency: (
    cleaningFrequency: CleaningFrequency,
    availableFrequencies: CleaningFrequencyData[]
  ) => void;
  endDate: () => ValidDate;
}

export const createCleaningDetailsSlice: StateCreator<CleaningDetailsSlice> = (
  set,
  get
) => ({
  totalCost: 0,
  durationInMinutes: 0,
  orderedServices: [],
  orderServiceFormData: null,
  cleaningFrequencyDisplayData: null,
  startDate: null,
  hourDate: null,
  includeDetergents: false,
  setData: (formData, serviceData) =>
    set((state) => {
      const { id, name, unit, cleaningFrequencies } = serviceData;
      const { numberOfUnits, cleaningFrequency, extraServices } = formData;

      // get the current services data
      const primaryService = createOrUpdateOrderedService(
        { id, name, unit },
        state.orderedServices,
        true,
        numberOfUnits
      );

      const secondaryServices: OrderedService[] = [];

      serviceData.secondaryServices?.forEach((service, index) => {
        const numberOfUnits = extraServices?.[index] ?? 0;

        if (numberOfUnits > 0) {
          secondaryServices.push(
            createOrUpdateOrderedService(
              service,
              state.orderedServices,
              false,
              numberOfUnits
            )
          );
        }
      });

      // synchronize cleaning freaquency display data with its current value
      const cleaningFrequencyDisplayData =
        cleaningFrequencies?.find(
          (frequency) => cleaningFrequency === frequency.value
        ) ?? null;

      const services = [primaryService, ...secondaryServices];
      // calculate the total cost and duration
      const { totalCost, durationInMinutes } =
        calculateTotalCostAndDuration(services);

      return {
        orderServiceFormData: formData,
        orderedServices: services,
        cleaningFrequencyDisplayData,
        totalCost,
        durationInMinutes
      };
    }),
  onChangeIncludeDetergents: (includeDetergents) => {
    set((state) => ({
      includeDetergents,
      totalCost: includeDetergents
        ? state.totalCost + DETERGENT_COST
        : state.totalCost - DETERGENT_COST
    }));
  },
  onChangeServiceNumberOfUnits: (numberOfUnits, isMainService, serviceData) => {
    set((state) => {
      const newService = createOrUpdateOrderedService(
        serviceData,
        state.orderedServices,
        isMainService,
        numberOfUnits
      );

      const newServices = [...state.removeService(serviceData.id)];

      if (newService.numberOfUnits > 0) {
        newServices.push(newService);
      }

      return {
        orderedServices: newServices,
        ...calculateTotalCostAndDuration(newServices)
      };
    });
  },
  removeService: (id) =>
    get().orderedServices.filter((service) => id !== service.id),
  getServiceNumberOfUnits: (id) => get().getServiceById(id)?.numberOfUnits ?? 0,
  getServiceById: (id) =>
    get().orderedServices.find((service) => id === service.id),
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

    return mergeDayDateAndHourDate(
      get().startDate as Date,
      get().hourDate as Date
    );
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
    set(() => ({ startDate, hourDate: null }));
  },
  onChangeHourDate: (hourDate) => {
    set(() => ({ hourDate }));
  }
});
