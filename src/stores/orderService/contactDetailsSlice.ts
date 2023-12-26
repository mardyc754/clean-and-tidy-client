import type { ValueOf } from 'type-fest';
import { type StateCreator } from 'zustand';

import type {
  Address,
  ContactDetails,
  ContactDetailsFormData
} from '~/schemas/forms/orderService';

export interface ContactDetailsSlice {
  clientData: ContactDetails;
  addressData: Address;
  extraInfo: string | null;
  onChangeClientData: (
    fieldName: keyof ContactDetails,
    value: ValueOf<typeof fieldName>
  ) => void;
  onChangeAddressData: (
    fieldName: keyof Address,
    value: ValueOf<typeof fieldName>
  ) => void;
  contactDetailsFormData: () => ContactDetailsFormData;
  onChangeExtraInfo: (value: string) => void;
}

export const initialContactDetailsState = {
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
    postCode: ''
  },
  extraInfo: null
};

export const createContactDetailsSlice: StateCreator<ContactDetailsSlice> = (
  set,
  get
) => ({
  ...initialContactDetailsState,
  onChangeClientData: (fieldName, value) => {
    set(() => ({
      clientData: { ...get().clientData, [fieldName]: value }
    }));
  },
  onChangeAddressData: (fieldName, value) => {
    set(() => ({
      addressData: { ...get().addressData, [fieldName]: value }
    }));
  },
  contactDetailsFormData: () => ({
    ...get().clientData,
    ...get().addressData,
    extraInfo: get().extraInfo
  }),
  onChangeExtraInfo: (value) => {
    set(() => ({
      extraInfo: value
    }));
  }
});
