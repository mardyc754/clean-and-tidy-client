import { useForm } from 'react-hook-form';

import { getAddress } from '~/api/address';
import { ResponseError } from '~/api/errors/ResponseError';

import {
  type ContactDetailsFormData,
  contactDetailsResolver
} from '~/schemas/forms/orderService';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

type UseContactDetailsFormProps = {
  submitHandler: () => Promise<void>;
};
export function useContactDetailsForm({
  submitHandler
}: UseContactDetailsFormProps) {
  const { contactDetailsFormData } = useOrderServiceFormStore((state) => ({
    contactDetailsFormData: state.contactDetailsFormData
  }));

  const methods = useForm<ContactDetailsFormData>({
    resolver: contactDetailsResolver,
    defaultValues: contactDetailsFormData()
  });

  const {
    handleSubmit,
    formState: { errors },
    setError
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await getAddress({
      street: data.street,
      postCode: data.postCode,
      houseNumber: data.houseNumber
    })
      .then(async () => {
        await submitHandler();
      })
      .catch((err) => {
        if (err instanceof ResponseError) {
          setError('street', { message: err.message });
        }
      });
  });

  return {
    methods,
    errors,
    onSubmit
  };
}
