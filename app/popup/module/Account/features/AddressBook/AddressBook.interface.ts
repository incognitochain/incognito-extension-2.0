export interface IProps {}

export interface IAddressBook {
  address: string;
  name: string;
}

export interface IAddressBookItem {
  name: string;
  address: string;
  onSelectedItem: ({ address }: { address: string }) => void;
}
