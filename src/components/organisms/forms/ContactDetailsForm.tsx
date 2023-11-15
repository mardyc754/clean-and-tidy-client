import { useRouter } from 'next/router';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import {
  type ContactDetailsFormData,
  contactDetailsResolver
} from '~/schemas/forms/orderService';

import { useOrderServiceFormStore } from '~/stores/orderServiceFormStore';

import { TextArea, Textfield } from '~/components/molecules/form-fields';

import { StepButtons } from '../form-fields';

const ContactDetailsForm = () => {
  const methods = useForm<ContactDetailsFormData>({
    resolver: contactDetailsResolver
  });

  const {
    handleSubmit,
    formState: { errors }
  } = methods;

  const {
    onChangeClientData,
    onChangeAddressData,
    currentStep,
    decreaseStep,
    increaseStep
  } = useOrderServiceFormStore((state) => ({
    onChangeAddressData: state.onChangeAddressData,
    onChangeClientData: state.onChangeClientData,
    currentStep: state.currentStep,
    decreaseStep: state.decreaseStep,
    increaseStep: state.increaseStep
  }));

  // console.log(methods.watch());
  const router = useRouter();

  const onDecreaseStep = async () => {
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, currentStep: 1 }
    });
  };
  const onSubmit: SubmitHandler<ContactDetailsFormData> = async () => {
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, currentStep: 3 }
    });
  };

  return (
    <FormProvider {...methods}>
      {/* <form onSubmit={handleSubmit(increaseStep)}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 grid-rows-6 gap-10 py-16">
          <Textfield
            wrapperProps="col-span-3 row-span-1"
            label="First name"
            name="firstName"
            required
            className="w-full"
            onChange={(value) => {
              onChangeClientData('firstName', value);
            }}
            errorLabel={errors.firstName?.message}
          />
          <Textfield
            wrapperProps="col-span-3 row-span-1"
            label="Last name"
            name="lastName"
            required
            className="w-full"
            onChange={(value) => {
              onChangeClientData('lastName', value);
            }}
            errorLabel={errors.lastName?.message}
          />

          <Textfield
            wrapperProps="col-span-3 row-span-1"
            label="Email"
            type="email"
            name="email"
            required
            className="w-full"
            onChange={(value) => {
              onChangeClientData('email', value);
            }}
            errorLabel={errors.email?.message}
          />
          <Textfield
            wrapperProps="col-span-3 row-span-1"
            label="Phone number"
            type="tel"
            name="phone"
            required
            className="w-full"
            onChange={(value) => {
              onChangeClientData('phone', value);
            }}
            errorLabel={errors.phone?.message}
          />

          <Textfield
            wrapperProps="col-span-4 row-span-1"
            label="Street"
            name="street"
            required
            className="w-full"
            onChange={(value) => {
              onChangeAddressData('street', value);
            }}
            errorLabel={errors.street?.message}
          />

          <Textfield
            wrapperProps="col-span-2 row-span-1"
            label="House number"
            name="houseNumber"
            required
            className="w-full"
            onChange={(value) => {
              onChangeAddressData('houseNumber', value);
            }}
            errorLabel={errors.houseNumber?.message}
          />
          <Textfield
            wrapperProps="col-span-2 row-span-1"
            label="Postcode"
            name="postCode"
            required
            className="w-full"
            onChange={(value) => {
              onChangeAddressData('postCode', value);
            }}
            errorLabel={errors.postCode?.message}
          />

          <Textfield
            wrapperProps="col-span-4 row-span-1"
            label="City"
            name="city"
            required
            className="w-full"
            onChange={(value) => {
              onChangeAddressData('city', value);
            }}
            errorLabel={errors.city?.message}
          />
          <TextArea
            wrapperProps="col-span-6 row-span-2"
            className="h-full w-full"
            label="Extra Info"
            name="extraInfo"
          />
        </div>
        {/* <StepButtons currentStep={currentStep} onDecreaseStep={decreaseStep} /> */}
        <StepButtons
          currentStep={currentStep}
          onDecreaseStep={onDecreaseStep}
        />
      </form>
    </FormProvider>
  );
};

export default ContactDetailsForm;
