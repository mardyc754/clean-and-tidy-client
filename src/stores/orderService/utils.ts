import type { BasicServiceData, OrderedService } from '~/schemas/api/services';

export const createOrUpdateOrderedService = (
  service: BasicServiceData,
  orderedServices: OrderedService[],
  isMainServiceForReservation: boolean,
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
    isMainServiceForReservation
  };
};

export const calculateTotalCostAndDuration = (
  orderedServices: OrderedService[]
) => {
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
