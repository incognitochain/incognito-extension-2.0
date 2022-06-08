export interface IProps {}

export interface IIncognitoAddress {}

export interface IAddressBook {
    address: string;
    name: string;
    mainnet?: boolean;
    tokenId?: string;
    networkName?: string;
    rootNetworkName?: string;
    createdAt?: number;
    updatedAt?: number;
    type: 1 | 2 | number;
    isKeychain?: boolean;
    canBeRemoved?: boolean;
    canBeEdit?: boolean;
}

export interface IAddressBookReducer {
    incognitoAddress: IAddressBook[];
    externalAddress: IAddressBook[];
    selected?: IAddressBook | any;
    [x: string]: any;
}

export interface IPayload {
    addressBook: IAddressBook;
}
