import { useEffect, useState } from 'react';

import type { Service } from '~/schemas/api/services';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

type UseOrderServicePageLoadingProps = {
  data: Service;
};

export const useOrderServicePageLoading = ({
  data
}: UseOrderServicePageLoadingProps) => {
  const [serviceIdChecked, setServiceIdChecked] = useState(false);

  const { initializeWithNewServiceId, onChangeCleaningFrequency } =
    useOrderServiceFormStore((state) => ({
      initializeWithNewServiceId: state.initializeWithNewServiceId,
      onChangeCleaningFrequency: state.onChangeCleaningFrequency
    }));

  useEffect(() => {
    if (data) {
      initializeWithNewServiceId(data.id);
    }
    setServiceIdChecked(true);
  }, [data.id, initializeWithNewServiceId, data]);

  useEffect(() => {
    if (data.cleaningFrequencies?.length == 1) {
      onChangeCleaningFrequency(
        data.cleaningFrequencies[0]!.value,
        data.cleaningFrequencies
      );
    }
  }, [data.cleaningFrequencies, onChangeCleaningFrequency]);

  return { serviceIdChecked };
};
