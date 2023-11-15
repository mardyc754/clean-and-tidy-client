import type { ValueOf } from 'type-fest';
import { type StateCreator } from 'zustand';

import type { Address, ContactDetails } from '~/schemas/forms/orderService';

export interface ContactDetailsSlice {
  clientData: ContactDetails;
  addressData: Address;
  onChangeClientData: (
    fieldName: keyof ContactDetails,
    value: ValueOf<typeof fieldName>
  ) => void;
  onChangeAddressData: (
    fieldName: keyof Address,
    value: ValueOf<typeof fieldName>
  ) => void;
}

export const createContactDetailsSlice: StateCreator<ContactDetailsSlice> = (
  set,
  get
) => ({
  clientData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  },
  addressData: {
    street: '',
    houseNumber: '',
    // floor: '',
    // door: '',
    postCode: '',
    city: ''
  },
  onChangeClientData: (fieldName, value) => {
    set(() => ({
      clientData: { ...get().clientData, [fieldName]: value }
    }));
  },
  onChangeAddressData: (fieldName, value) => {
    set(() => ({
      addressData: { ...get().addressData, [fieldName]: value }
    }));
  }
});
