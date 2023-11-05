import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { user } from '~/constants/queryKeys';

import { login } from '~/api/auth';
import type { ResponseError } from '~/api/errors/ResponseError';

import { loginDataResolver, type LoginData } from '~/schemas/forms/auth';
import type { LoginErrorData, LoginSuccessData } from '~/schemas/api/auth';

interface useLoginProps {
  redirectOnSuccessHandler?: () => Promise<void> | VoidFunction;
}

export const useLogin = ({ redirectOnSuccessHandler }: useLoginProps) => {
  const queryClient = useQueryClient();

  const methods = useForm<LoginData>({ resolver: loginDataResolver });

  const { handleSubmit, setError } = methods;

  const mutation = useMutation<
    LoginSuccessData,
    ResponseError<LoginErrorData>,
    LoginData
  >({
    mutationFn: login,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: user });
      toast.success(data.message);
      await redirectOnSuccessHandler?.();
    },
    onError: (error) => {
      if (error.data.affectedField) {
        setError(error.data.affectedField, { message: error.message });
        return;
      }

      toast.error(error.message);
    }
  });

  const onSubmit = handleSubmit((values, e) => {
    e?.preventDefault();

    mutation.mutate(values);
  });

  return { onSubmit, methods };
};
