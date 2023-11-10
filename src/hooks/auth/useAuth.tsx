import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '~/api/auth';

import { user as userQueryKey } from '~/constants/queryKeys';

import {
  isAuthenticated,
  isClientUser,
  isEmployeeUser
} from '~/utils/userUtils';

export const useAuth = () => {
  const {
    data: user,
    isPending,
    error,
    isSuccess
  } = useQuery({
    queryKey: userQueryKey,
    queryFn: getCurrentUser
  });

  return {
    currentUser: isAuthenticated(user) ? user : null,
    error,
    isClient: isClientUser(user),
    isEmployee: isEmployeeUser(user),
    isSuccess,
    isPending
  };
};
