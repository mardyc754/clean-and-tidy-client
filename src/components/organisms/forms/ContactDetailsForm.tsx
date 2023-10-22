import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { Textfield, TextArea } from '~/components/molecules/form-fields';
import { useOrderServiceFormStore } from '~/stores/orderServiceFormStore';

const ContactDetailsForm = () => {
  const methods = useForm();

  const { onChangeClientData, onChangeAddressData } = useOrderServiceFormStore(
    (state) => ({
      onChangeAddressData: state.onChangeAddressData,
      onChangeClientData: state.onChangeClientData
    })
  );

  // console.log(methods.watch());

  return (
    <FormProvider {...methods}>
      <form className="grid grid-cols-6 grid-rows-6 gap-10 py-16">
        <Textfield
          wrapperProps="col-span-3 row-span-1"
          label="First name"
          name="firstName"
          required
          className="w-full"
          onChange={(value) => {
            onChangeClientData('firstName', value);
          }}
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
        />
        <Textfield
          wrapperProps="col-span-2 row-span-1"
          label="Postcode"
          name="postcode"
          required
          className="w-full"
          onChange={(value) => {
            onChangeAddressData('postCode', value);
          }}
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
        />
        <TextArea
          wrapperProps="col-span-6 row-span-2"
          className="h-full w-full"
          label="Extra Info"
          name="extraInfo"
        />
      </form>
    </FormProvider>
  );
};

export default ContactDetailsForm;
