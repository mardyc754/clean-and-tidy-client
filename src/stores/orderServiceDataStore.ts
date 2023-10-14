import { create } from 'zustand';
import type { BasicServiceData } from '~/api/schemas/services';

import type { CleaningFrequencyData } from '~/types/forms';

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
  startDate: Date | null;
  includeDetergents: boolean;
  orderedServices: OrderedService[];
  increaseTotalCost: (cost: number) => void;
  increaseTotalDuration: (duration: number) => void;
  increaseTotalCostAndDuration: (cost: number, duration: number) => void;
  changeCleaningFrequency: (frequency: CleaningFrequencyData) => void;
  changeStartDate: (date: Date) => void;
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
    changeStartDate: (date) => set({ startDate: date }),
    changeIncludeDetergents: () =>
      set((state) => ({ includeDetergents: !state.includeDetergents })),
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

        return {
          orderedServices: [...state.removeService(service.id), newService]
        };
      }),
    cancelOrderingService: (id) =>
      set((state) => {
        const oldService = state.orderedServices.find(
          (service) => id === service.id
        );

        if (!oldService) return { orderedServices: state.orderedServices };

        oldService.numberOfUnits -= 1;

        return {
          orderedServices:
            oldService.numberOfUnits > 0
              ? [...state.orderedServices]
              : state.removeService(id)
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

        return {
          orderedServices: [...state.removeService(service.id), newService]
        };
      }),
    removeService: (id) =>
      get().orderedServices.filter((service) => id !== service.id)
  })
);

export default useOrderServiceDataStore;
