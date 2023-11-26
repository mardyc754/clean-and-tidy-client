import type { Employee } from '~/schemas/api/employee';
import type { VisitPart } from '~/schemas/api/reservation';
import type {
  BasicServiceData,
  OrderedService,
  OrderedVisitPart,
  Service
} from '~/schemas/api/services';

import { advanceDateByNMinutes } from '~/utils/dateUtils';

export const createOrUpdateOrderedService = (
  service: BasicServiceData,
  employeeId: Employee['id'],
  orderedServices: (OrderedService | undefined)[],
  isMainServiceForReservation: boolean,
  numberOfUnits: number
) => {
  const orderedService = orderedServices.find(
    (orderedService) => orderedService?.id === service.id
  );

  if (!orderedService) {
    return {
      ...service,
      isMainServiceForReservation,
      visitParts: [
        {
          serviceId: service.id,
          employeeId,
          numberOfUnits
        }
      ]
    };
  }

  const visitPart = orderedService?.visitParts.find(
    (visitPart) => visitPart.employeeId === employeeId
  );

  if (visitPart) {
    visitPart.numberOfUnits = numberOfUnits;
    return orderedService;
  }

  return {
    ...orderedService,
    visitParts: [
      ...orderedService.visitParts,
      {
        serviceId: service.id,
        employeeId,
        numberOfUnits
      }
    ]
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

      const { totalCost: serviceCost, durationInMinutes: serviceDuration } =
        calculateServiceCostAndDuration(service);

      return {
        totalCost: acc.totalCost + serviceCost,
        durationInMinutes: acc.durationInMinutes + serviceDuration
      };
    },
    { totalCost: 0, durationInMinutes: 0 }
  );
};

export const calculateServiceCostAndDuration = (
  orderedService: OrderedService | undefined
) => {
  if (!orderedService?.unit) {
    return { totalCost: 0, durationInMinutes: 0 };
  }

  const { unit, visitParts } = orderedService;

  return visitParts.reduce(
    (acc, visitPart) => {
      const { totalCost: cost, durationInMinutes: duration } =
        calculateVisitPartCostAndDuration(visitPart, unit);

      return {
        totalCost: acc.totalCost + cost,
        durationInMinutes: acc.durationInMinutes + duration
      };
    },
    { totalCost: 0, durationInMinutes: 0 }
  );
};

export const calculateServiceNumberOfUnits = (
  orderedService: OrderedService | undefined
) => {
  if (!orderedService?.visitParts) {
    return 0;
  }

  const { visitParts } = orderedService;

  return visitParts.reduce((acc, { numberOfUnits }) => acc + numberOfUnits, 0);
};

export const calculateVisitPartCostAndDuration = (
  visitPart: OrderedVisitPart,
  unit: Service['unit']
) => {
  if (!unit) {
    return { totalCost: 0, durationInMinutes: 0 };
  }

  const { numberOfUnits } = visitPart;

  return {
    totalCost: numberOfUnits * unit.price,
    durationInMinutes: numberOfUnits * unit.duration
  };
};

export const prepareVisitParts = (
  orderedServices: (OrderedService | undefined)[],
  startDate: Date
) => {
  let currentDate = startDate;

  orderedServices.sort((a, b) => {
    return (
      Number(b?.isMainServiceForReservation ?? 0) -
      Number(a?.isMainServiceForReservation ?? 0)
    );
  });

  return orderedServices.reduce<VisitPart[]>((acc, service) => {
    if (!service?.unit) {
      return acc;
    }

    const { visitParts } = service;

    const visitPartsForService = visitParts.map((visitPart) => {
      const { totalCost, durationInMinutes } =
        calculateVisitPartCostAndDuration(visitPart, service.unit);

      const visitPartEndDate = advanceDateByNMinutes(
        currentDate,
        durationInMinutes
      );

      const newVisitPart = {
        ...visitPart,
        startDate: currentDate.toISOString(),
        endDate: visitPartEndDate.toISOString(),
        cost: totalCost
      } as VisitPart;

      currentDate = visitPartEndDate;

      return newVisitPart;
    });

    return [...acc, ...visitPartsForService];
  }, [] as VisitPart[]);
};
