import { combineReducers } from "redux";

import { reducer as appReducer } from "@redux/app/app.reducer";
import { reducer as masterKeyReducer } from "@redux/masterKey/masterKey.reducer";
import { reducer as accountReducer } from "@redux/account/account.reducer";
import { reducer as walletReducer } from "@redux/wallet/wallet.reducer";

const rootReducers = combineReducers({
  appReducer,
  masterKeyReducer,
  accountReducer,
  walletReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;
