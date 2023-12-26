import { basicError } from '~/schemas/common';
import { type Address, address } from '~/schemas/forms/orderService';

import { handleFetchingData } from './handleFetchingData';

export const getAddress = async (data: Address) => {
  return await handleFetchingData({
    path: `/addresses/check`,
    method: 'post',
    successSchema: address,
    errorSchema: basicError,
    data
  });
};
