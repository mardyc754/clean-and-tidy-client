import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  type ContactDetailsFormData,
  contactDetailsResolver
} from '~/schemas/forms/orderService';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

type UseContactDetailsFormProps = {
  submitHandler: SubmitHandler<ContactDetailsFormData>;
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
    formState: { errors }
  } = methods;

  const onSubmit = handleSubmit(submitHandler);

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
