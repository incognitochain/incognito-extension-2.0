import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { isKeyChainExist } from "src/utils/keychain";
import {
  ACTION_CREATE,
  ACTION_DELETE,
  ACTION_UPDATE,
  ACTION_SELECTED,
  ACTION_REMOVE_SELECTED,
  ADDRESS_BOOK_TYPE,
} from "./AddressBook.constant";
import { IAddressBook, IAddressBookReducer, IPayload } from "./AddressBook.interface";

const initialState: IAddressBookReducer = {
  incognitoAddress: [],
  externalAddress: [],
  selected: undefined,
};

const addressBookReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ACTION_CREATE: {
      const { addressBook }: IPayload = action.payload;
      const field = ADDRESS_BOOK_TYPE[addressBook.type];
      const oldAddressedBook: IAddressBook[] = state[field];
      return {
        ...state,
        [field]: [...oldAddressedBook, { ...addressBook, createdAt: new Date().getTime() }],
      };
    }
    case ACTION_UPDATE: {
      const { addressBook }: IPayload = action.payload;
      const field = ADDRESS_BOOK_TYPE[addressBook.type];
      const oldAddressedBook: IAddressBook[] = state[field];
      return {
        ...state,
        [field]: [
          ...oldAddressedBook.map((item) =>
            item.address === addressBook.address ? { ...item, ...addressBook, updatedAt: new Date().getTime() } : item,
          ),
        ],
      };
    }
    case ACTION_DELETE: {
      const { addressBook }: IPayload = action.payload;
      const field = ADDRESS_BOOK_TYPE[addressBook.type];
      const oldAddressedBook: IAddressBook[] = state[field];
      // const isExist = isKeyChainExist(oldAddressedBook, addressBook);
      const isExist = false;
      if (!isExist) {
        return state;
      }
      return {
        ...state,
        [field]: [...oldAddressedBook.filter((item) => item.address !== addressBook.address)],
      };
    }
    case ACTION_SELECTED: {
      const { addressBook }: { addressBook: IAddressBook } = action.payload;
      return {
        ...state,
        selected: { ...addressBook },
      };
    }
    case ACTION_REMOVE_SELECTED: {
      return {
        ...state,
        selected: null,
      };
    }
    default:
      return state;
  }
};

const persistConfig = {
  key: "addressBook",
  storage,
  whitelist: ["incognitoAddress", "externalAddress"],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, addressBookReducer);
