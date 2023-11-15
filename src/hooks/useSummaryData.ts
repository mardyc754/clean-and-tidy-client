import { useShallow } from 'zustand/react/shallow';

import { EMPTY_DATA_PLACEHOLDER } from '~/constants/primitives';

import { useOrderServiceFormStore } from '~/stores/orderServiceFormStore';

import {
  displayDayDateAndHourDate,
  displayTimeInHours
} from '~/utils/dateUtils';

import type { NullableDate } from '~/types/forms';

export const useSummaryData = (serviceName: string) => {
  const {
    totalCost,
    totalDuration,
    cleaningFrequency,
    startDate,
    hourDate,
    clientData,
    addressData
  } = useOrderServiceFormStore(
    useShallow((state) => ({
      orderServiceFormData: state.orderServiceFormData,
      totalCost: state.totalCost,
      totalDuration: state.durationInMinutes,
      cleaningFrequency: state.cleaningFrequencyDisplayData,
      startDate: state.startDate,
      hourDate: state.hourDate,
      clientData: state.clientData,
      addressData: state.addressData
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
    ]
  ]);

  return {
    totalCost,
    summaryData,
    contactDetails: { ...clientData, ...addressData }
  };
};
