import { Textfield } from '~/components/molecules/form-fields';

const ContactDetailsForm = () => {
  return (
    <form className="w full grid grid-cols-2 gap-6 py-16">
      <Textfield label="First name" name="firstName" required />
      <Textfield label="Last name" name="lastName" required />
      <Textfield label="Email" type="email" name="email" required />
      <Textfield label="Phone number" type="tel" name="phoneNumber" required />
      <Textfield label="Street" name="street" required />
      <Textfield label="Postcode" name="postcode" required />
      <Textfield label="House number" name="houseNumber" required />
      <Textfield label="City" name="city" required />
      <Textfield label="Extra Info" name="extraInfo" />
    </form>
  );
};

export default ContactDetailsForm;
