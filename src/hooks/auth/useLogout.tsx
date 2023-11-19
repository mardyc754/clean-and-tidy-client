import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { user } from '~/constants/queryKeys';

import { logout } from '~/api/auth';
import type { ResponseError } from '~/api/errors/ResponseError';

import type { LogoutSuccessData } from '~/schemas/api/auth';
import type { BackendBasicErrorData } from '~/schemas/common';

export const useLogout = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation<
    LogoutSuccessData,
    ResponseError<BackendBasicErrorData>
  >({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: user });

      await router.push('/');
    }
  });

  const logoutFn = () =>
    toast.promise(mutation.mutateAsync(), {
      loading: 'Logging out...',
      success: 'Logout success',
      error: 'Logout failed'
    });

  return { logout: logoutFn };
};
