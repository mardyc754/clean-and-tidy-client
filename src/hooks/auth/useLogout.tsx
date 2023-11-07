import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { user } from '~/constants/queryKeys';

import { logout } from '~/api/auth';
import type { ResponseError } from '~/api/errors/ResponseError';

import type { LogoutSuccessData } from '~/schemas/api/auth';
import type { BackendBasicErrorData } from '~/schemas/api/common';

export const useLogout = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation<
    LogoutSuccessData,
    ResponseError<BackendBasicErrorData>
  >({
    mutationFn: logout,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: user });
      toast.success(data.message);

      await router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  if (mutation.isPending) {
    toast.loading('Logging out...');
  }

  const logoutFn = () => mutation.mutate();

  return { logout: logoutFn };
};
