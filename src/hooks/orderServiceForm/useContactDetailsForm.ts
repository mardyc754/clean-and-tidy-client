import { set } from 'lodash';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { getAddress } from '~/api/address';
import { ResponseError } from '~/api/errors/ResponseError';

import {
  type ContactDetailsFormData,
  contactDetailsResolver
} from '~/schemas/forms/orderService';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

type UseContactDetailsFormProps = {
  // submitHandler: SubmitHandler<ContactDetailsFormData>;
  submitHandler: () => Promise<void>;
};
export function useContactDetailsForm({
  submitHandler
}: UseContactDetailsFormProps) {
  const {
    onChangeClientData,
    onChangeAddressData,
    contactDetailsFormData,
    onChangeExtraInfo
  } = useOrderServiceFormStore((state) => ({
    onChangeAddressData: state.onChangeAddressData,
    onChangeClientData: state.onChangeClientData,
    currentStep: state.currentStep,
    contactDetailsFormData: state.contactDetailsFormData,
    onChangeExtraInfo: state.onChangeExtraInfo
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
    onSubmit,
    onChangeClientData,
    onChangeAddressData,
    onChangeExtraInfo,
    contactDetailsFormData
  };
}
