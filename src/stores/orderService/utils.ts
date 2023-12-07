import type { VisitPart } from '~/schemas/api/reservation';
import type {
  BasicServiceData,
  OrderedService,
  OrderedVisitPart,
  Service
} from '~/schemas/api/services';
import type {
  EmployeeAvailabilityData,
  Timeslot
} from '~/schemas/forms/orderService';

import {
  type ValidDayjsDate,
  advanceByMinutes,
  endOfDay,
  getTimeSlot,
  minutesBetween,
  nextDay,
  startOfDay
} from '~/utils/dateUtils';
import { calculateBusyHours } from '~/utils/serviceUtils';

/**
 * Creates or updates ordered service data from ordereed services list
 * @param service ordered service data to be created or updated
 * @param orderedServices services already ordered by the user
 * @param isMainServiceForReservation flag to set the service as main service for the reservation
 * @param numberOfUnits new total number of units to be assigned to the service
 * @param positionOnList the position of the service in the ordered services list
 * @returns created or updated service with assigned employees
 */
export const createOrUpdateOrderedService = (
  service: BasicServiceData,
  orderedServices: (OrderedService | undefined)[],
  isMainServiceForReservation: boolean,
  numberOfUnits: number,
  positionOnList: number
) => {
  const newOrderedServices =
    orderedServices.length === 0
      ? Array<OrderedService | undefined>(positionOnList).fill(undefined)
      : [...orderedServices];

  if (positionOnList >= newOrderedServices.length) {
    newOrderedServices.push(
      ...Array<OrderedService | undefined>(
        positionOnList - orderedServices.length
      ).fill(undefined)
    );
  }

  newOrderedServices[positionOnList] = {
    ...service,
    isMainServiceForReservation,
    visitParts: [
      {
        serviceId: service.id,
        numberOfUnits
      }
    ]
  };

  const initialDuration =
    calculateTotalCostAndDuration(newOrderedServices).durationInMinutes;

  // if estimated cleaning duration exceeds 8 hours, then assign more employees
  const minNumOfEmployeesRequired = Math.ceil(initialDuration / 480);

  // use greedy algorithm to create visit parts
  // in the first order, create visit parts for the service
  // with the longest duration per unit
  const sortedOrderedServices = [...newOrderedServices];

  sortedOrderedServices.sort(
    (a, b) => (b?.unit?.duration ?? 0) - (a?.unit?.duration ?? 0)
  );

  const visitPartsDurations = Array<number>(minNumOfEmployeesRequired).fill(0);

  sortedOrderedServices.forEach((service) => {
    if (!service) {
      return;
    }

    const serviceNumberOfUnits = calculateServiceNumberOfUnits(service);
    let remainingServiceUnits = serviceNumberOfUnits;

    const newVisitParts = [
      ...Array<{ serviceId?: number; numberOfUnits: number }>(
        minNumOfEmployeesRequired
      )
    ].map(() => ({
      serviceId: service?.id,
      numberOfUnits: 0
    }));

    while (remainingServiceUnits > 0) {
      const visitPartWithMinDurationIndex = visitPartsDurations.findIndex(
        (duration, _, arr) => Math.min(...arr) === duration
      );

      if (visitPartWithMinDurationIndex === -1) {
        break;
      }

      newVisitParts[visitPartWithMinDurationIndex]!.numberOfUnits += 1;
      remainingServiceUnits -= 1;

      visitPartsDurations[visitPartWithMinDurationIndex] +=
        service.unit?.duration ?? 0;
    }

    const finalVisitParts = newVisitParts;
    // const finalVisitParts = newVisitParts.filter(
    //   (visitPart) => visitPart.numberOfUnits > 0
    // );

    const indexInUnsortedList = newOrderedServices.findIndex(
      (s) => s && s.id === service.id
    );

    if (indexInUnsortedList === -1) {
      return;
    }

    newOrderedServices[indexInUnsortedList] =
      finalVisitParts.length > 0
        ? {
            ...service,
            visitParts: finalVisitParts
          }
        : undefined;
  });

  return newOrderedServices;
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

export const calculateVisitCostAndDuration = (
  orderedServices: (OrderedService | undefined)[]
) => {
  const highestNumberOfVisitParts = Math.max(
    ...orderedServices.map((service) => service?.visitParts.length ?? 0)
  );

  const totalCost = orderedServices.reduce((acc, service) => {
    if (!service?.unit) {
      return acc;
    }

    const { totalCost: serviceCost } = calculateServiceCostAndDuration(service);

    return acc + serviceCost;
  }, 0);

  const employeeDurations =
    highestNumberOfVisitParts > 0
      ? Array<number>(highestNumberOfVisitParts).fill(0)
      : [];

  orderedServices.forEach((service) => {
    if (!service?.unit) {
      return;
    }

    service.visitParts.forEach((visitPart, index) => {
      employeeDurations[index] +=
        visitPart.numberOfUnits * (service.unit?.duration ?? 0);
    });
  });

  return {
    totalCost,
    durationInMinutes:
      employeeDurations.length > 0 ? Math.max(...employeeDurations) : 0
  };
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

      const visitPartEndDate = advanceByMinutes(currentDate, durationInMinutes);

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

/**
 * Searches for employees that are not busy during the visit slot
 * @param employees the list of all available employees for all ordered services
 * @param visitSlot the time slot of the visit
 * @returns the list of the ids of the employees that are not busy
 *  during the visit slot ordered ascending by the number of working hours
 */
export const getAssignedEmployees = (
  employees: EmployeeAvailabilityData[],
  visitSlot: Timeslot
) => {
  const notConlictingEmployees = employees.filter(
    (employee) =>
      calculateBusyHours([employee.workingHours, [visitSlot]]).length === 0
  );

  notConlictingEmployees.sort((a, b) => {
    return a.numberOfWorkingHours - b.numberOfWorkingHours;
  });

  // TODO: right now only one employee is assigned,
  // when the predicted visit slot is longer than 8 hours
  // then the service should be split into multiple visit parts
  // therefore multiple employees should be assigned
  return notConlictingEmployees.length > 0
    ? [notConlictingEmployees[0]!.id]
    : [];
};

const assignEmployeesToService = (
  service: OrderedService,
  employees: EmployeeAvailabilityData[],
  employeeStartDates: Date[]
) => {
  if (employeeStartDates.length < service.visitParts.length) {
    return service;
  }

  const serviceVisitParts = service?.visitParts ?? [];

  const assignedEmployeesToVisitParts: number[] = [];
  const newServiceVisitParts: OrderedVisitPart[] = [];

  serviceVisitParts.forEach((visitPart, index) => {
    const { numberOfUnits } = visitPart;

    const visitPartDuration = numberOfUnits * (service?.unit?.duration ?? 0);

    const visitPartStartDate = new Date(employeeStartDates[index]!);

    const visitPartEndDate = advanceByMinutes(
      visitPartStartDate,
      visitPartDuration
    );

    const visitPartTimeslot = {
      startDate: visitPartStartDate.toISOString(),
      endDate: visitPartEndDate.toISOString()
    };

    const availableEmployees = employees.filter(
      (employee) =>
        employee.services.includes(service?.id ?? 0) &&
        calculateBusyHours([employee.workingHours, [visitPartTimeslot]])
          .length === 0 &&
        !assignedEmployeesToVisitParts.includes(employee.id)
    );

    availableEmployees.sort((a, b) => {
      return a.numberOfWorkingHours - b.numberOfWorkingHours;
    });

    const assignedEmployee = availableEmployees[0]?.id;

    if (assignedEmployee) {
      assignedEmployeesToVisitParts.push(assignedEmployee);
    }
    newServiceVisitParts.push({
      ...visitPart,
      employeeId: assignedEmployee
    });

    employeeStartDates[index] = visitPartEndDate;
  });

  return {
    ...service,
    visitParts: newServiceVisitParts
  };
};

export const updateEmployeeServiceAssignment = (
  employees: EmployeeAvailabilityData[],
  orderedServices: (OrderedService | undefined)[],
  startDate: Date
) => {
  const newOrderedServices = [...orderedServices];

  const numberOfNeededEmployees = Math.max(
    ...orderedServices.map((service) => service?.visitParts.length ?? 0)
  );

  console.log('numberOfNeededEmployees', numberOfNeededEmployees);

  // this can happen when no services are ordered
  if (numberOfNeededEmployees <= 0) {
    return orderedServices;
  }

  const employeeStartDates = Array<Date>(numberOfNeededEmployees).fill(
    startDate
  );

  const mainService = orderedServices.find(
    (service) => service?.isMainServiceForReservation
  );

  if (mainService) {
    newOrderedServices[newOrderedServices.length - 1] =
      assignEmployeesToService(mainService, employees, employeeStartDates);
  }

  const secondaryServices = orderedServices.filter(
    (service) => !service?.isMainServiceForReservation
  );

  secondaryServices.forEach((service, index) => {
    if (!service) {
      return;
    }

    newOrderedServices[index] = assignEmployeesToService(
      service,
      employees,
      employeeStartDates
    );
  });
  return newOrderedServices;
};

export const resetAssignedEmployees = (
  orderedServices: (OrderedService | undefined)[]
) => {
  return orderedServices.map((service) =>
    service
      ? {
          ...service,
          visitParts: service.visitParts.map((visitPart) => ({
            ...visitPart,
            employeeId: undefined
          }))
        }
      : service
  );
};
