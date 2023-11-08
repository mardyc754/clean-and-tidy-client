import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import type { FormEvent } from 'react';

import { register } from '~/api/auth';
import type { ResponseError } from '~/api/errors/ResponseError';

import { user } from '~/constants/queryKeys';

import type {
  RegistrationSuccessData,
  RegistrationErrorData
} from '~/schemas/api/auth';
import {
  registrationDataResolver,
  type RegistrationData
} from '~/schemas/forms/auth';

import { omit } from 'lodash';

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: user });
      await redirectOnSuccessHandler?.();
    },
    onError: (result) => {
      if (result.data.affectedField) {
        setError(result.data.affectedField, { message: result.message });
        return;
      }
    }
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) =>
    toast.promise(
      handleSubmit((values, e) => {
        e?.preventDefault();

        const { password, confirmPassword } = values;

        if (password !== confirmPassword) {
          const doNotMatchMessage = 'Passwords do not match';
          setError('password', { message: doNotMatchMessage });
          setError('confirmPassword', { message: doNotMatchMessage });
          return;
        }

        mutation.mutate(omit(values, ['confirmPassword']));
      })(event),
      {
        loading: 'Loading...',
        success: 'Registration successfull',
        error: 'Registration failed'
      }
    );

  return { onSubmit, methods };
};
