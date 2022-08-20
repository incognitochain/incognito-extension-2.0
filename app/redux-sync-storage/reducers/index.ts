import { reducer as test } from "@redux-sync-storage/test";
import { reducer as account } from "@redux-sync-storage/account";
import { reducer as followTokens } from "@redux-sync-storage/followTokens";
import { reducer as scanCoinsReducer } from "@redux-sync-storage/scanCoins";
import { reducer as networkReducer } from "@redux-sync-storage/network";
import { $CombinedState, combineReducers } from "redux";
import themeReducer from "@popup/theme/Theme.reducer";
const rootReducers = combineReducers({
  test,
  account,
  themeReducer,
  followTokens,
  scanCoinsReducer,
  networkReducer,
});

export type RootState = ReturnType<typeof rootReducers> & {
  readonly [$CombinedState]?: undefined;
};

export default rootReducers;
