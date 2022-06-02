import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { AppGetState, AppThunkDispatch } from "@redux/store/index";
import { getToken } from "@services/authService";
import storage from "@services/storage";
import Server from "@services/wallet/Server";

const { PDexV3 } = require("incognito-chain-web-js/build/web/wallet");

export const actionGetPDexV3Inst = () => async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  const state = getState();
  const account = defaultAccountWalletSelector(state);
  const pDexV3 = await getPDexV3Instance({ account });
  return pDexV3;
};

export const getPDexV3Instance = async ({ account = {} } = {}) => {
  try {
    const server = await Server.getDefault();
    let pDexV3Inst = new PDexV3();
    const authToken = await getToken();
    if (account) {
      pDexV3Inst.setAccount(account);
    }
    pDexV3Inst.setAuthToken(authToken);
    pDexV3Inst.setRPCTradeService(server.tradeServices);
    pDexV3Inst.setStorageServices(storage);
    pDexV3Inst.setRPCTxServices(server.pubsubServices);
    pDexV3Inst.setRPCApiServices(server.apiServices);
    return pDexV3Inst;
  } catch (error) {
    console.log("getPDexV3Instance-error", error);
  }
};
