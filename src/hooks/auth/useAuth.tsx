import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { user as userQueryKey } from '~/constants/queryKeys';

import { getCurrentUser } from '~/api/auth';

import type { AuthenticatedUser } from '~/schemas/api/auth';

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
  }, [user, isPending, router, redirectIfUnauthenticated, hasAccess]);

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
