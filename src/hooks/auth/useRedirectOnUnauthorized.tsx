import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '~/hooks/auth/useAuth';

type Options = {
  redirectPath?: string;
};

export const useRedirectOnUnauthorized = () => {
  const router = useRouter();
  const { currentUser, isPending } = useAuth();

  useEffect(() => {
    if (!isPending && !currentUser) {
      void router.push('/login');
    }
  }, [currentUser, isPending, router]);

  return {
    currentUser
  };
};
