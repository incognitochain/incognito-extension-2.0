export enum SendActionTypes {
  FETCHING = "[send] Fetching data",
  FETCHED = "[send] Fetched data",
  FREE_DATA = "[send] Free data",
  SET_NETWORK_FEE = "[send] Set network fee",
  SET_BURN_FEE = "[send] Set burn fee",
  SET_INIT_FORM = "[send] Set int form",
}

export const FORM_CONFIGS = {
  formName: "form-send",
  amount: "amount",
  toAddress: "toAddress",
  fee: "fee",
  memo: "memo",
};
