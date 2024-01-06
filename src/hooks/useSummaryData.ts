import { useShallow } from 'zustand/react/shallow';

import { EMPTY_DATA_PLACEHOLDER } from '~/constants/primitives';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

import {
  displayDayDateAndHourDate,
  displayTimeInHours
} from '~/utils/dateUtils';

import type { NullableDate } from '~/types/forms';

export const useSummaryData = (serviceName: string) => {
  const {
    totalCost: visitCost,
    detergentsCost,
    totalDuration,
    cleaningFrequency,
    startDate,
    hourDate,
    clientData,
    addressData,
    extraInfo,
    getAssignedEmployees
  } = useOrderServiceFormStore(
    useShallow((state) => ({
      totalCost: state.totalCost,
      totalDuration: state.durationInMinutes,
      cleaningFrequency: state.cleaningFrequencyDisplayData,
      startDate: state.startDate,
      hourDate: state.hourDate,
      clientData: state.clientData,
      addressData: state.addressData,
      extraInfo: state.extraInfo,
      detergentsCost: state.detergentsCost,
      getAssignedEmployees: state.getAssignedEmployees
    }))
  );

  const summaryData = new Map([
    ['Selected service', `${serviceName}`],
    [
      'Cleaning frequency',
      `${cleaningFrequency?.name ?? EMPTY_DATA_PLACEHOLDER}`
    ],
    ['Cleaning duration', `${displayTimeInHours(totalDuration)}`],
    [
      'First cleaning date',
      `${displayDayDateAndHourDate(
        startDate as NullableDate,
        hourDate as NullableDate
      )}`
    ],
    [
      'Number of assigned employees',
      `${getAssignedEmployees().length ?? EMPTY_DATA_PLACEHOLDER}`
    ]
  ]);

  return {
    totalCost: visitCost + detergentsCost,
    extraInfo,
    summaryData,
    contactDetails: { ...clientData, ...addressData, city: 'Kraków' },
    assignedEmployees: getAssignedEmployees()
  };
};
