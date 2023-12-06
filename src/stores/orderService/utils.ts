import { duration } from 'dayjs';
import { min, omit } from 'lodash';

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
import {
  calculateBusyHours,
  getStartDateForService
} from '~/utils/serviceUtils';

/**
 * Creates or updates ordered service data from ordereed services list
 * @param service ordered service data to be created or updated
 * @param employees general list of employees being available for all of the ordered services
 * @param orderedServices services already ordered by the user
 * @param isMainServiceForReservation flag to set the service as main service for the reservation
 * @param numberOfUnits new total number of units to be assigned to the service
 * @param baseStartDate the start date of the main service that is the start date of all of the services
 * @param positionOnList the position of the service in the ordered services list
 * @returns created or updated service with assigned employees
 */
export const createOrUpdateOrderedService = (
  service: BasicServiceData,
  employees: EmployeeAvailabilityData[],
  orderedServices: (OrderedService | undefined)[],
  isMainServiceForReservation: boolean,
  numberOfUnits: number,
  baseStartDate: ValidDayjsDate,
  positionOnList: number
) => {
  const startDate = baseStartDate
    ? getStartDateForService(orderedServices, positionOnList, baseStartDate)
    : null;

  // const availableEmployees = employees.filter((employee) =>
  //   employee.services.includes(service.id)
  // );

  // if (availableEmployees.length === 0) {
  //   return undefined;
  // }

  const duration = (service.unit?.duration ?? 0) * numberOfUnits;

  // const assignedEmployees = startDate
  //   ? getAssignedEmployees(availableEmployees, getTimeSlot(startDate, duration))
  //   : availableEmployees.slice(0, 1).map((employee) => employee.id);

  const orderedServiceIndex = orderedServices.findIndex(
    (orderedService) => orderedService?.id === service.id
  );

  if (orderedServiceIndex === -1) {
    return {
      ...service,
      isMainServiceForReservation,
      visitParts: [2].map((employeeId) => ({
        serviceId: service.id,
        employeeId,
        // numberOfUnits: Math.ceil(numberOfUnits / assignedEmployees.length)
        numberOfUnits: Math.ceil(numberOfUnits / 1)
      }))
    };
  }

  const orderedService = orderedServices[orderedServiceIndex]!;

  // there should be exactly one visit part within the service
  // assigned to the specific employee
  const visitPart = orderedService?.visitParts.find(
    (visitPart) =>
      // assignedEmployees.includes(visitPart.employeeId) && service.id === visitPart.serviceId
      [2].includes(visitPart.employeeId) && service.id === visitPart.serviceId
  );

  if (visitPart) {
    visitPart.numberOfUnits = numberOfUnits;
    return orderedService;
  }

  return {
    ...orderedService,
    visitParts: [
      ...orderedService.visitParts,
      // ...assignedEmployees.map((employeeId) => ({
      //   serviceId: service.id,
      //   employeeId,
      //   numberOfUnits
      // }))
      ...[2].map((employeeId) => ({
        serviceId: service.id,
        employeeId,
        numberOfUnits
      }))
    ]
  };
};

export const createOrUpdateOrderedService2 = (
  service: BasicServiceData,
  orderedServices: (OrderedService | undefined)[],
  isMainServiceForReservation: boolean,
  numberOfUnits: number,
  positionOnList: number
) => {
  const newOrderedServices = [...orderedServices];

  const orderedServiceIndex = orderedServices.findIndex(
    (orderedService) => orderedService?.id === service.id
  );

  if (orderedServiceIndex === -1) {
    // maybe we should determine number of visit parts here as well
    newOrderedServices[positionOnList] = {
      ...service,
      isMainServiceForReservation,
      visitParts: [
        {
          serviceId: service.id,
          // employeeId,
          // numberOfUnits: Math.ceil(numberOfUnits / assignedEmployees.length)
          numberOfUnits
        }
      ]
    };
  }

  const orderedService = orderedServices[orderedServiceIndex]!;
  const oldOrderedServiceNumberOfUnits =
    calculateServiceNumberOfUnits(orderedService);

  const servicesDurations = newOrderedServices.map((service) => {
    return service
      ? {
          serviceId: service.id,
          isMainServiceForReservation: service.isMainServiceForReservation,
          duration: calculateServiceCostAndDuration(service).durationInMinutes,
          numberOfUnits: calculateServiceNumberOfUnits(service)
        }
      : undefined;
  });

  const initialDuration =
    calculateTotalCostAndDuration(newOrderedServices).durationInMinutes -
    oldOrderedServiceNumberOfUnits +
    numberOfUnits;
  const minNumOfEmployeesRequired = Math.ceil(initialDuration / 480);

  if (minNumOfEmployeesRequired > 1) {
    let durationToDistribute = initialDuration / minNumOfEmployeesRequired;

    const mainService = newOrderedServices.find(
      (service) => service?.isMainServiceForReservation
    );

    const mainServiceDuration =
      calculateServiceCostAndDuration(mainService).durationInMinutes;

    newOrderedServices[newOrderedServices.length - 1] = mainService
      ? {
          ...mainService,
          visitParts: Array({ length: minNumOfEmployeesRequired }).map(() => ({
            serviceId: mainService.id,
            numberOfUnits: Math.ceil(
              mainServiceDuration / minNumOfEmployeesRequired
            )
          }))
        }
      : undefined;

    durationToDistribute -= mainServiceDuration / minNumOfEmployeesRequired;

    const secondaryServices = newOrderedServices.filter(
      (service) => service?.isMainServiceForReservation === false
    );

    secondaryServices.sort(
      (a, b) =>
        calculateServiceNumberOfUnits(a) - calculateServiceNumberOfUnits(b)
    );

    secondaryServices.forEach((service) => {
      const secondaryServiceIndex = newOrderedServices.findIndex(
        (s) => service?.id && service?.id === s?.id
      );

      const secondaryServiceDuration =
        calculateServiceCostAndDuration(service).durationInMinutes;

      const numberOfVisitParts = (newOrderedServices[secondaryServiceIndex] = {
        ...service,
        visitParts: Array({ length: minNumOfEmployeesRequired }).map(() =>
          service
            ? {
                serviceId: service.id,
                numberOfUnits: Math.ceil(
                  secondaryServiceDuration / minNumOfEmployeesRequired
                )
              }
            : undefined
        )
      });
    });

    // newOrderedServices[newOrderedServices.length - 1] = {

    // newOrderedServices[newOrderedServices.length - 1] = { ... }

    //   return acc;
    // }, [] as { serviceId: number | undefined; duration: number; isMainServiceForReservation?: boolean; numberOfUnits: number }[]);
    // sort the services in the following order:
    // - first is the main service for the reservation
    // - the rest is sorted by the duration ascending
    const sortedServicesDurations = servicesDurations.sort(
      (a, b) =>
        Number(b.isMainServiceForReservation ?? 0) -
        Number(a.isMainServiceForReservation ?? 0) -
        a.duration -
        b.duration
    );

    // uniqueServicesDurations.forEach((service) => {
    //   const newService = {

    //   }
    // );
  }
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
  console.log('employees', employees);
  console.log('visitSlot', visitSlot);
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
