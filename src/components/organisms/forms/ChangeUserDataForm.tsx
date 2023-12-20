import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { user as userQueryKey } from '~/constants/queryKeys';

import { changeCurrentUserData } from '~/api/auth';

import {
  type ChangeUserData,
  changeUserDataResolver
} from '~/schemas/forms/userProfile';

import { useAuth } from '~/hooks/auth/useAuth';

import { Button } from '~/components/atoms/buttons';
import { Textfield } from '~/components/molecules/form-fields';

const ChangeUserDataForm = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const methods = useForm<ChangeUserData>({
    defaultValues: {
      firstName: currentUser?.firstName ?? '',
      lastName: currentUser?.lastName ?? '',
      phone: currentUser?.phone
    },
    resolver: changeUserDataResolver
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit
  } = methods;

  const mutation = useMutation({
    mutationFn: (data: ChangeUserData) => {
      if (!currentUser) {
        throw new Error('User not found');
      }
      return changeCurrentUserData(data);
    },
    onSuccess: () => {
      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: userQueryKey
          });
        })(),
        {
          loading: 'Changing user data',
          success: 'User data changed successfully',
          error: 'Failed to change user data'
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        className="grid max-w-sm grid-rows-4 items-start space-y-1 p-4"
        onSubmit={handleSubmit((data, e) => {
          e?.preventDefault();
          mutation.mutate(data);
        })}
      >
        <Textfield
          name="firstName"
          label="First name"
          className=" rounded-md border-2 border-input"
          errorLabel={errors.firstName?.message}
        />
        <Textfield
          name="lastName"
          label="Last name"
          className="rounded-md border-2 border-input"
          errorLabel={errors.lastName?.message}
        />
        <Textfield
          name="phone"
          label="Phone number"
          className="rounded-md border-2 border-input"
          errorLabel={errors.phone?.message}
        />
        <div className="py-4">
          <Button type="submit" disabled={isSubmitting} className="w-24">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChangeUserDataForm;
