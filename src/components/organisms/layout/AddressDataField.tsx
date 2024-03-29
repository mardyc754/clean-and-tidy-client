import type { Address, ContactDetails } from '~/schemas/forms/orderService';

type AddressDataFieldProps = {
  data: Address & ContactDetails;
};

const AddressDataField = ({ data }: AddressDataFieldProps) => {
  const { firstName, lastName, street, houseNumber, postCode, phone } = data;

  return (
    <>
      <p>
        {firstName} {lastName}
      </p>
      <p>
        {street} {houseNumber}
      </p>
      <p>{`${postCode} Kraków`}</p>
      <br />
      <p>Phone: {phone}</p>
    </>
  );
};

export default AddressDataField;
