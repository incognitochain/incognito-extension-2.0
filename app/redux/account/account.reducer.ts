import { Reducer } from "redux";
const initialState = {
  list: [],
  defaultAccountName: "",
  isGettingBalance: [],
  switch: false,
  create: false,
  import: false,
  signPublicKeyEncode: "",
  burnerAddress: "",
  isFetchingNFT: false,
  toggleModalMintMoreNFT: false,
  nft: {
    nftToken: "",
    initNFTToken: true,
    list: [],
  },
};
export const reducer: Reducer<any> = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
