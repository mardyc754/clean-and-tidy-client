import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { OrderServiceInputData } from '~/api/schemas/reservation';
import { type BasicServiceData, type Service } from '~/api/schemas/services';
import type {
  CleaningFrequencyData,
  CleaningFrequency,
  ValidDate
} from '~/types/forms';

import { DETERGENT_COST } from '~/utils/constants';

type OrderedService = BasicServiceData & {
  isMainServiceInReservation: boolean;
  numberOfUnits: number;
};

interface OrderServiceFormStoreState {
  totalCost: number;
  durationInMinutes: number;
  includeDetergents: boolean;
  startDate: ValidDate;
  hourDate: ValidDate;
  orderServiceFormData: OrderServiceInputData | null;
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
  setData: (formData: OrderServiceInputData, serviceData: Service) => void;
  getServiceById: (id: BasicServiceData['id']) => OrderedService | undefined;
  getServiceNumberOfUnits: (id: BasicServiceData['id']) => number;
  removeService: (id: BasicServiceData['id']) => OrderedService[];
  onChangeCleaningFrequency: (
    cleaningFrequency: CleaningFrequency,
    availableFrequencies: CleaningFrequencyData[]
  ) => void;
}

const createOrUpdateOrderedService = (
  service: BasicServiceData,
  orderedServices: OrderedService[],
  isMainServiceInReservation: boolean,
  numberOfUnits: number
) => {
  const orderedService = orderedServices.find(({ id }) => id === service.id);
  if (orderedService) {
    orderedService.numberOfUnits = numberOfUnits;
    return orderedService;
  }

  return {
    ...service,
    numberOfUnits,
    isMainServiceInReservation
  };
};

const calculateTotalCostAndDuration = (orderedServices: OrderedService[]) => {
  return orderedServices.reduce(
    (acc, service) => {
      const price = service.unit?.price ?? 0;
      const duration = service.unit?.duration ?? 0;
      return {
        totalCost: acc.totalCost + price * service.numberOfUnits,
        durationInMinutes:
          acc.durationInMinutes + duration * service.numberOfUnits
      };
    },
    { totalCost: 0, durationInMinutes: 0 }
  );
};

export const useOrderServiceFormStore = create<OrderServiceFormStoreState>()(
  devtools(
    (set, get) => ({
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
      onChangeServiceNumberOfUnits: (
        numberOfUnits,
        isMainService,
        serviceData
      ) => {
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
      getServiceNumberOfUnits: (id) =>
        get().getServiceById(id)?.numberOfUnits ?? 0,
      getServiceById: (id) =>
        get().orderedServices.find((service) => id === service.id),
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
    }),
    { name: 'orderServiceFormStore' }
  )
);
