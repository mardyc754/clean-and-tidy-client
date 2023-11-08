import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FormEvent } from 'react';

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: user });
      await redirectOnSuccessHandler?.();
    },
    onError: (error) => {
      if (error.data.affectedField) {
        setError(error.data.affectedField, { message: error.message });
        return;
      }
    }
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) =>
    toast.promise(
      handleSubmit((values, e) => {
        e?.preventDefault();

        mutation.mutate(values);
      })(event),
      {
        loading: 'Loading...',
        success: 'Login success',
        error: 'Login failed'
      }
    );

  return { onSubmit, methods };
};
