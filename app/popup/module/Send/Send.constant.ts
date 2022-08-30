export enum SendActionTypes {
  FETCHING = "REDUX_SYNC_STORAGE[send] Fetching data",
  FETCHED = "REDUX_SYNC_STORAGE[send] Fetched data",
  FREE_DATA = "REDUX_SYNC_STORAGE[send] Free data",
  UNSHIELD = "REDUX_SYNC_STORAGE[send] Unshield",
  SET_NETWORK_FEE = "REDUX_SYNC_STORAGE[send] Set network fee",
  SET_BURN_FEE = "REDUX_SYNC_STORAGE[send] Set burn fee",
  SET_INIT_FORM = "REDUX_SYNC_STORAGE[send] Set int form",
}

export const FORM_CONFIGS = {
  formName: "form-send",
  amount: "amount",
  toAddress: "toAddress",
  fee: "fee",
  burnFee: "burnFee",
  memo: "memo",
};
