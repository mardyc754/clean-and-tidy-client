import type { BasicServiceData, OrderedService } from '~/schemas/api/services';

export const createOrUpdateOrderedService = (
  service: BasicServiceData,
  orderedServices: (OrderedService | undefined)[],
  isMainServiceForReservation: boolean,
  numberOfUnits: number
) => {
  const orderedService = orderedServices.find(
    (orderedService) => orderedService?.id === service.id
  );
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
  orderedServices: (OrderedService | undefined)[]
) => {
  return orderedServices.reduce(
    (acc, service) => {
      if (!service?.unit) {
        return acc;
      }
      const price = service.unit.price;
      const duration = service.unit.duration;
      return {
        totalCost: acc.totalCost + price * service.numberOfUnits,
        durationInMinutes:
          acc.durationInMinutes + duration * service.numberOfUnits
      };
    },
    { totalCost: 0, durationInMinutes: 0 }
  );
};
