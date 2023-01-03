import { reducer as test } from "@redux-sync-storage/test";
import { reducer as account } from "@redux-sync-storage/account";
import { reducer as followTokensReducer } from "@redux-sync-storage/followTokens";
import { reducer as scanCoinsReducer } from "@redux-sync-storage/scanCoins";
import { reducer as networkReducer } from "@redux-sync-storage/network";
import { reducer as selectedPrivacyReducer } from "@redux-sync-storage/selectedPrivacy";
import assetsReducer from "@module/Assets/Assets.reducer";
import { $CombinedState, combineReducers } from "redux";
import themeReducer from "@popup/theme/Theme.reducer";
import { reducer as formReducer } from "redux-form";
import sendReducer from "@module/Send/Send.reducer";
import signTransactionReducer from "@module/SignTransaction/SignTransaction.reducer";
import { reducer as versionReducer } from "@redux-sync-storage/version";
import { reducer as masterkeyReducer } from "@redux-sync-storage/masterkey";

const rootReducers = combineReducers({
  versionReducer,
  account,
  themeReducer,
  followTokensReducer,
  scanCoinsReducer,
  networkReducer,
  selectedPrivacyReducer,
  assetsReducer,
  sendReducer,
  form: formReducer,
  signTransactionReducer,
  masterkeyReducer,
});

export type RootState = ReturnType<typeof rootReducers> & {
  readonly [$CombinedState]?: undefined;
};

export default rootReducers;
