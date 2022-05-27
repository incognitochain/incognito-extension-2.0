import { combineReducers } from "redux";

import { reducer as appReducer } from "@redux/app/app.reducer";
import { reducer as masterKeyReducer } from "@redux/masterKey/masterKey.reducer";
import { reducer as accountReducer } from "@redux/account/account.reducer";
import { reducer as walletReducer } from "@redux/wallet/wallet.reducer";
import { reducer as scanCoinsReducer } from "@redux/scanCoins";
import { reducer as headerReducer } from "@components/Header";
import { reducer as configReducer } from "@popup/configs";

const rootReducers = combineReducers({
  appReducer,
  masterKeyReducer,
  accountReducer,
  walletReducer,
  scanCoinsReducer,
  headerReducer,
  configReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;
