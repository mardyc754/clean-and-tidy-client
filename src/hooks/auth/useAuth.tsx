import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '~/api/auth';

import type { AuthenticatedUser } from '~/schemas/api/auth';

import { user as userQueryKey } from '~/constants/queryKeys';

import {
  isAuthenticated,
  isClientUser,
  isEmployeeUser
} from '~/utils/userUtils';

export const useAuth = (
  validationCallback?: (user: AuthenticatedUser) => boolean,
  redirectIfUnauthenticated = false
) => {
  const router = useRouter();
  const {
    data: user,
    isPending,
    error,
    isSuccess
  } = useQuery({
    queryKey: userQueryKey,
    queryFn: getCurrentUser
  });

  const hasAccess =
    isAuthenticated(user) && (!validationCallback || validationCallback(user));

  const getUser = () => {
    return hasAccess ? user : null;
  };

  useEffect(() => {
    if (!isPending && !hasAccess && redirectIfUnauthenticated) {
      void router.push('/login');
    }
  }, [user, isPending, router, redirectIfUnauthenticated]);

  return {
    currentUser: getUser(),
    error,
    isClient: isClientUser(user),
    isEmployee: isEmployeeUser(user),
    isSuccess,
    isPending,
    hasAccess
  };
};
