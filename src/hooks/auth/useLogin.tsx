import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { user } from '~/constants/queryKeys';

import { login } from '~/api/auth';
import type { ResponseError } from '~/api/errors/ResponseError';

import type { LoginErrorData, LoginSuccessData } from '~/schemas/api/auth';
import { type LoginData, loginDataResolver } from '~/schemas/forms/auth';

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
    onSuccess: () =>
      toast.promise(
        (async () => {
          await queryClient.invalidateQueries({ queryKey: user });
          await redirectOnSuccessHandler?.();
        })(),
        {
          loading: 'Loading...',
          success: 'Login success',
          error: 'Login failed'
        }
      ),
    onError: (error) => {
      // need to throw an error or at least reject the promise
      if (error.data.affectedField) {
        setError(error.data.affectedField, { message: error.message });
        return;
      }
    }
  });

  const onSubmit = handleSubmit((values, e) => {
    e?.preventDefault();

    mutation.mutate(values);
  });

  return { onSubmit, methods };
};
