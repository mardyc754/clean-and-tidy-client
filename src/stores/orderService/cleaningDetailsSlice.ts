import { omit } from 'lodash';
import { type StateCreator } from 'zustand';

import { initialCleaningDetailsFormData } from '~/constants/orderServiceForm';
import { DETERGENT_COST } from '~/constants/primitives';

import {
  type BasicServiceData,
  type OrderedService,
  type Service
} from '~/schemas/api/services';
import type { OrderServiceInputData } from '~/schemas/forms/orderService';

import { advanceByMinutes, mergeDayDateAndHourDate } from '~/utils/dateUtils';

import type { CleaningFrequency } from '~/types/enums';
import type { CleaningFrequencyData, ValidDate } from '~/types/forms';

import {
  calculateTotalCostAndDuration,
  createOrUpdateOrderedService
} from './utils';

type StoredDate = ValidDate | string;

export interface CleaningDetailsSlice {
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
  onChangeServiceNumberOfUnits: (
    numberOfUnits: number,
    isMainService: boolean,
    serviceData: BasicServiceData,
    positionOnList: number
  ) => void;
  onChangeIncludeDetergents: (includeDetergents: boolean) => void;
  onChangeStartDate: (startDate: ValidDate) => void;
  onChangeHourDate: (hourDate: ValidDate) => void;
  fullStartDate: () => StoredDate;
  setData: (formData: OrderServiceInputData, serviceData: Service) => void;
  getServiceById: (id: BasicServiceData['id']) => OrderedService | undefined;
  getServiceNumberOfUnits: (id: BasicServiceData['id']) => number;
  // removeService: (id: BasicServiceData['id']) => OrderedService[];
  removeService: (id: BasicServiceData['id']) => void;
  onChangeCleaningFrequency: (
    cleaningFrequency: CleaningFrequency,
    availableFrequencies: CleaningFrequencyData[]
  ) => void;
  endDate: () => ValidDate;
  cleaningDetailsFormData: () => OrderServiceInputData;
  resetCleaningDetailsData: () => void;
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
  onChangeServiceNumberOfUnits: (
    numberOfUnits,
    isMainService,
    serviceData,
    positionOnList
  ) => {
    set((state) => {
      const newService = createOrUpdateOrderedService(
        serviceData,
        state.orderedServices,
        isMainService,
        numberOfUnits
      );

      // const newServices = [...state.removeService(serviceData.id)];
      const newServices = [...state.orderedServices];
      newServices[positionOnList] = newService;

      // newServices.push(newService);

      return {
        orderedServices: newServices,
        ...calculateTotalCostAndDuration(newServices)
      };
    });
  },
  // removeService: (id) =>
  //   get().orderedServices.filter((service) =>  !!service && id !== service.id),
  removeService: (id) => {
    set((state) => {
      const oldServiceIndex = state.orderedServices.findIndex(
        (service) => service?.id === id
      );

      const newService = [...state.orderedServices];

      newService[oldServiceIndex] = undefined;

      return {
        orderedServices: newService
      };
    });
  },
  getServiceNumberOfUnits: (id) => get().getServiceById(id)?.numberOfUnits ?? 0,
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

    return mergeDayDateAndHourDate(
      new Date(startDate as Date | string),
      new Date(hourDate as Date | string)
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
  },
  cleaningDetailsFormData: () => {
    const {
      orderedServices,
      cleaningFrequencyDisplayData,
      startDate,
      hourDate,
      includeDetergents
    } = get();

    return {
      numberOfUnits:
        orderedServices.find((service) => service?.isMainServiceForReservation)
          ?.numberOfUnits ?? 0,
      cleaningFrequency: cleaningFrequencyDisplayData?.value ?? null,
      startDate: startDate ? new Date(startDate as Date | string) : null,
      hourDate: hourDate ? new Date(hourDate as Date | string) : null,
      includeDetergents,
      extraServices:
        orderedServices.map((service) =>
          !service ? service : service.numberOfUnits
        ) ?? []
    };
  },
  resetCleaningDetailsData: () => {
    set({
      ...initialCleaningDetailsState
    });
  }
});
