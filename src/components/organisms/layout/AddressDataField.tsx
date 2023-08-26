import type { AddressData } from '~/types/forms';

type AddressDataFieldProps = {
  data: AddressData;
};

const AddressDataField = ({ data }: AddressDataFieldProps) => {
  const {
    firstName,
    lastName,
    street,
    houseNumber,
    postcode,
    city,
    phoneNumber
  } = data;

  return (
    <>
      <p>
        {firstName} {lastName}
      </p>
      <p>
        {street} {houseNumber}
      </p>
      <p>
        {postcode} {city}
      </p>
      <br />
      <p>Phone: {phoneNumber}</p>
    </>
  );
};

export default AddressDataField;
