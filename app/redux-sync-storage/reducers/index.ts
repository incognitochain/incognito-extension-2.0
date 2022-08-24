import { reducer as test } from "@redux-sync-storage/test";
import { reducer as account } from "@redux-sync-storage/account";
import { reducer as followTokensReducer } from "@redux-sync-storage/followTokens";
import { reducer as scanCoinsReducer } from "@redux-sync-storage/scanCoins";
import { reducer as networkReducer } from "@redux-sync-storage/network";
import assetsReducer from "@module/Assets/Assets.reducer";
import { $CombinedState, combineReducers } from "redux";
import themeReducer from "@popup/theme/Theme.reducer";
import { reducer as formReducer } from "redux-form";

const rootReducers = combineReducers({
  test,
  account,
  themeReducer,
  followTokensReducer,
  scanCoinsReducer,
  networkReducer,
  assetsReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducers> & {
  readonly [$CombinedState]?: undefined;
};

export default rootReducers;
