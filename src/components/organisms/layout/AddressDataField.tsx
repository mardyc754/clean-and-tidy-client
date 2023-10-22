import type {
  Address,
  OrderServiceClientData
} from '~/api/schemas/reservation';

type AddressDataFieldProps = {
  data: Address & OrderServiceClientData;
};

const AddressDataField = ({ data }: AddressDataFieldProps) => {
  const { firstName, lastName, street, houseNumber, postCode, city, phone } =
    data;

  return (
    <>
      <p>
        {firstName} {lastName}
      </p>
      <p>
        {street} {houseNumber}
      </p>
      <p>
        {postCode} {city}
      </p>
      <br />
      <p>Phone: {phone}</p>
    </>
  );
};

export default AddressDataField;
