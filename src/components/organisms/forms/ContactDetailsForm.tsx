import { FormProvider } from 'react-hook-form';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

import { useAuth } from '~/hooks/auth/useAuth';
import { useContactDetailsForm } from '~/hooks/orderServiceForm/useContactDetailsForm';
import { useOrderServiceFormNavigation } from '~/hooks/orderServiceForm/useOrderServiceFormNavigation';

import { Heading3 } from '~/components/atoms/typography/headings';
import { TextArea, Textfield } from '~/components/molecules/form-fields';

import { StepButtons } from '../form-fields';

const ContactDetailsForm = () => {
  const { currentUser } = useAuth();
  const { onChangeStep } = useOrderServiceFormNavigation();
  const { methods, errors, onSubmit } = useContactDetailsForm({
    submitHandler: async () => await onChangeStep(3)
  });

  const { onChangeClientData, onChangeAddressData, onChangeExtraInfo } =
    useOrderServiceFormStore((state) => ({
      onChangeAddressData: state.onChangeAddressData,
      onChangeClientData: state.onChangeClientData,
      onChangeExtraInfo: state.onChangeExtraInfo
    }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-3 grid-rows-1 gap-10 py-16 md:grid-cols-8 md:grid-rows-6">
          <Textfield
            wrapperProps="md:col-span-4 row-span-1 col-span-3"
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
            wrapperProps="md:col-span-4 row-span-1 col-span-3"
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
            wrapperProps="md:col-span-4 row-span-1 col-span-3"
            label="Email"
            type="email"
            name="email"
            required
            defaultValue={currentUser?.email}
            disabled={!!currentUser?.email}
            className="w-full"
            onChange={(value) => {
              onChangeClientData('email', value);
            }}
            errorLabel={errors.email?.message}
          />
          <Textfield
            wrapperProps="md:col-span-4 row-span-1 col-span-3"
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
          <div className="col-span-3 row-span-1 self-end md:col-span-8">
            <Heading3>Address</Heading3>
            <p>Enter valid Krakow address</p>
          </div>
          <Textfield
            wrapperProps="md:col-span-4 row-span-1 col-span-3"
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
            wrapperProps="md:col-span-2 row-span-1 col-span-3"
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
            wrapperProps="md:col-span-2 row-span-1 col-span-3"
            label="Postcode"
            name="postCode"
            required
            className="w-full"
            onChange={(value) => {
              onChangeAddressData('postCode', value);
            }}
            errorLabel={errors.postCode?.message}
          />
          <TextArea
            wrapperProps="md:col-span-8 row-span-2 col-span-3"
            className="h-full w-full"
            label="Extra Data"
            sublabel="Staircase number, floor, intercom code and other information that will help us find you"
            placeholder="Extra data"
            name="extraInfo"
            onChange={(value) => {
              onChangeExtraInfo(value);
            }}
            errorLabel={errors.extraInfo?.message}
          />
        </div>
        <StepButtons
          currentStep={2}
          onDecreaseStep={async () => await onChangeStep(1)}
        />
      </form>
    </FormProvider>
  );
};

export default ContactDetailsForm;
