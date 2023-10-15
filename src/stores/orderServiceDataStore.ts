import { create } from 'zustand';
import type { BasicServiceData } from '~/api/schemas/services';

import { DETERGENT_COST } from '~/utils/constants';

import type { CleaningFrequencyData, ValidDate } from '~/types/forms';

const createOrFindOrderedService = (
  service: BasicServiceData,
  orderedServices: OrderedService[],
  isMainServiceInReservation: boolean
) => {
  return (
    orderedServices.find(({ id }) => id === service.id) ?? {
      ...service,
      numberOfUnits: 0,
      isMainServiceInReservation
    }
  );
};

const calculateTotalCostAndDuration = (orderedServices: OrderedService[]) => {
  return orderedServices.reduce(
    (acc, service) => {
      const price = service.unit?.price ?? 0;
      const duration = service.unit?.duration ?? 0;
      return {
        totalCost: acc.totalCost + price * service.numberOfUnits,
        totalDuration: acc.totalDuration + duration * service.numberOfUnits
      };
    },
    { totalCost: 0, totalDuration: 0 }
  );
};

type OrderedService = BasicServiceData & {
  isMainServiceInReservation: boolean;
  numberOfUnits: number;
};
interface OrderServiceDataStoreState {
  numberOfUnits: number;
  unitName: string;
  totalCost: number;
  cleaningFrequency: CleaningFrequencyData | null;
  cleaningFrequencyData: CleaningFrequencyData[];
  totalDuration: number;
  startDate: ValidDate;
  hourDate: ValidDate;
  includeDetergents: boolean;
  orderedServices: OrderedService[];
  increaseTotalCost: (cost: number) => void;
  increaseTotalDuration: (duration: number) => void;
  increaseTotalCostAndDuration: (cost: number, duration: number) => void;
  changeCleaningFrequency: (frequency: CleaningFrequencyData) => void;
  changeStartDate: (date: ValidDate) => void;
  changeHourDate: (date: ValidDate) => void;
  changeIncludeDetergents: () => void;
  setCleaningFrequencyData: (data: CleaningFrequencyData[]) => void;
  orderService: (
    service: BasicServiceData,
    isMainServiceInReservation?: boolean
  ) => void;
  cancelOrderingService: (id: BasicServiceData['id']) => void;
  changeNumberOfUnits: (
    numberOfUnits: number,
    service: BasicServiceData,
    isMainServiceInReservation?: boolean
  ) => void;
  getServiceById: (id: number) => OrderedService | undefined;
  removeService: (id: number) => OrderedService[];
  getServiceNumberOfUnits: (id: number) => number;
}

const useOrderServiceDataStore = create<OrderServiceDataStoreState>(
  (set, get) => ({
    numberOfUnits: 0,
    unitName: '',
    totalCost: 0,
    cleaningFrequency: null,
    cleaningFrequencyData: [],
    totalDuration: 0,
    startDate: null,
    hourDate: null,
    includeDetergents: false,
    orderedServices: [],
    // address: '',
    increaseTotalCost: (cost: number) =>
      set((state) => ({ totalCost: state.totalCost + cost })),
    increaseTotalDuration: (duration: number) =>
      set((state) => ({ totalDuration: state.totalDuration + duration })),
    increaseTotalCostAndDuration: (cost: number, duration: number) =>
      set((state) => ({
        totalDuration: state.totalDuration + duration,
        totalCost: state.totalCost + cost
      })),
    changeCleaningFrequency: (frequency) =>
      set({ cleaningFrequency: frequency }),
    changeStartDate: (date) =>
      set({
        startDate: date,
        // TODO: the logic for hour date should be improved -
        // it should be changed to null only when the hour is not available in the selected day
        hourDate: null
      }),
    changeHourDate: (date) => set({ hourDate: date }),
    changeIncludeDetergents: () =>
      set((state) => ({
        includeDetergents: !state.includeDetergents,
        totalCost: state.includeDetergents
          ? state.totalCost - DETERGENT_COST
          : state.totalCost + DETERGENT_COST
      })),
    setCleaningFrequencyData: (data) => set({ cleaningFrequencyData: data }),
    orderService: (
      // maybe this should be divided into two functions?
      // - one for already ordered services
      // - one for new services
      service,
      isMainServiceInReservation = false
    ) =>
      set((state) => {
        const newService = createOrFindOrderedService(
          service,
          state.orderedServices,
          isMainServiceInReservation
        );
        newService.numberOfUnits += 1;

        const newServices = [...state.removeService(service.id), newService];
        return {
          orderedServices: newServices,
          ...calculateTotalCostAndDuration(newServices)
        };
      }),
    cancelOrderingService: (id) =>
      set((state) => {
        const oldService = state.orderedServices.find(
          (service) => id === service.id
        );

        if (!oldService) return { orderedServices: state.orderedServices };

        oldService.numberOfUnits -= 1;

        const newServices =
          oldService.numberOfUnits > 0
            ? [...state.orderedServices]
            : state.removeService(id);

        return {
          orderedServices: newServices,
          ...calculateTotalCostAndDuration(newServices)
        };
      }),
    getServiceById: (id) =>
      get().orderedServices.find((service) => id === service.id),
    changeNumberOfUnits: (
      numberOfUnits,
      service,
      isMainServiceInReservation = false
    ) =>
      set((state) => {
        const newService = createOrFindOrderedService(
          service,
          state.orderedServices,
          isMainServiceInReservation
        );

        newService.numberOfUnits = numberOfUnits;

        if (newService.numberOfUnits <= 0) {
          return { orderedServices: state.orderedServices };
        }

        const newServices = [...state.removeService(service.id), newService];

        return {
          orderedServices: newServices,
          ...calculateTotalCostAndDuration(newServices)
        };
      }),
    removeService: (id) =>
      get().orderedServices.filter((service) => id !== service.id),
    getServiceNumberOfUnits: (id) =>
      get().getServiceById(id)?.numberOfUnits ?? 0
  })
);

export default useOrderServiceDataStore;
