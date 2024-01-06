import { useMutation, useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';
import type { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { user } from '~/constants/queryKeys';

import { register } from '~/api/auth';
import type { ResponseError } from '~/api/errors/ResponseError';

import type {
  RegistrationErrorData,
  RegistrationSuccessData
} from '~/schemas/api/auth';
import {
  type RegistrationData,
  registrationDataResolver
} from '~/schemas/forms/auth';

interface useRegisterProps {
  redirectOnSuccessHandler?: () => Promise<void>;
}

export const useRegister = ({ redirectOnSuccessHandler }: useRegisterProps) => {
  const queryClient = useQueryClient();

  const methods = useForm<RegistrationData>({
    resolver: registrationDataResolver
  });

  const { handleSubmit, setError } = methods;

  const mutation = useMutation<
    RegistrationSuccessData,
    ResponseError<RegistrationErrorData>,
    Omit<RegistrationData, 'confirmPassword'>
  >({
    mutationFn: register,
    onSuccess: () =>
      toast.promise(
        (async () => {
          await queryClient.invalidateQueries({ queryKey: user });
          await redirectOnSuccessHandler?.();
        })(),
        {
          loading: 'Loading...',
          success: 'Registration successfull',
          error: 'Registration failed'
        }
      ),
    onError: (result) => {
      if (result.data.affectedField) {
        setError(result.data.affectedField, { message: result.message });
        return;
      }
    }
  });

  const onSubmit = handleSubmit((values, e) => {
    e?.preventDefault();

    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      const doNotMatchMessage = 'Passwords do not match';
      setError('password', { message: doNotMatchMessage });
      setError('confirmPassword', { message: doNotMatchMessage });
      return;
    }

    mutation.mutate(omit(values, ['confirmPassword']));
  });

  return { onSubmit, methods };
};
