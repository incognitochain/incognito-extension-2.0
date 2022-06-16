import { reducer as account } from "@redux/account/account.reducer";
import { reducer as appReducer } from "@redux/app/app.reducer";
import { reducer as follow } from "@redux/follow/follow.reducer";
import { reducer as masterKey } from "@redux/masterKey/masterKey.reducer";
import { reducer as pDexV3 } from "@redux/pDexV3/pDexV3.reducer";
import { reducer as selectedPrivacy } from "@redux/selectedPrivacy/selectedPrivacy.reducer";
import { reducer as token } from "@redux/token/token.reducer";
import { reducer as wallet } from "@redux/wallet/wallet.reducer";
import { reducer as scanCoinsReducer } from "@redux/scanCoins";
import { reducer as headerReducer } from "@components/Header";
import { reducer as configReducer } from "@popup/configs";
import { reducer as assetsReducer } from "@module/Assets";
import { reducer as themeReducer } from "@popup/theme";
import { reducer as sendReducer } from "@module/Send";
import { reducer as formReducer } from "redux-form";
import { $CombinedState, combineReducers } from "redux";

const rootReducers = combineReducers({
  appReducer,
  masterKey,
  account,
  wallet,
  token,
  follow,
  pDexV3,
  scanCoinsReducer,
  headerReducer,
  configReducer,
  assetsReducer,
  themeReducer,
  selectedPrivacy,
  sendReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducers> & {
  readonly [$CombinedState]?: undefined;
};

export const clearReduxStore = () => ({
  type: "CLEAR_STORE",
});

export const superRootReducer = (state: any, action: any) => {
  if (action.type === "CLEAR_STORE") state = undefined;
  return rootReducers(state, action);
};

export default rootReducers;
