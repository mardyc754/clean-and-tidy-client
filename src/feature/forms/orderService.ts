import type {
  Address,
  OrderServiceClientData,
  OrderServiceSubmitData,
  RecurringReservationCreationData
} from '~/api/schemas/reservation';
import type { OrderedService } from '~/api/schemas/services';

import {
  advanceDateByNMinutes,
  mergeDayDateAndHourDate
} from '~/utils/dateUtils';

export function prepareDataForSubmit(
  formData: OrderServiceSubmitData,
  clientData: OrderServiceClientData,
  addressData: Address,
  orderedServices: OrderedService[],
  totalCost: number,
  durationInMinutes: number
) {
  const { cleaningFrequency, startDate, hourDate, includeDetergents } =
    formData;

  const reservationStartDate = mergeDayDateAndHourDate(startDate, hourDate);
  const reservationEndDate = advanceDateByNMinutes(
    reservationStartDate,
    durationInMinutes
  );

  return {
    frequency: cleaningFrequency,
    clientId: 1, // TODO: hardcode for now
    // clientId: id,
    reservationData: {
      cost: totalCost,
      startDate: reservationStartDate.toISOString(),
      endDate: reservationEndDate.toISOString(),
      includeDetergents,
      employeeIds: [2] // TODO: change to real employee ids
    },
    address: addressData,
    services: orderedServices
  } satisfies RecurringReservationCreationData;
}
