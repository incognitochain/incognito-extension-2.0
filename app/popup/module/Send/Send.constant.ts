export enum SendActionTypes {
  FETCHING = "[send] Fetching data",
  FETCHED = "[send] Fetched data",
  SET_MAX_NATIVE_FEE = "[send] Set max native fee",
  SET_MAX_PTOKEN_FEE = "[send] Set max ptoken fee",
  FREE_DATA = "[send] Free data",
  INIT = "[send] Init",
}

export const FORM_CONFIGS = {
  formName: "form-send",
  amount: "amount",
  toAddress: "toAddress",
  fee: "fee",
  memo: "memo",
};
