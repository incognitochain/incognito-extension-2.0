import { reducer as test } from "@redux-sync-storage/test";
import { reducer as account } from "@redux-sync-storage/account";
import { reducer as followTokens } from "@redux-sync-storage/followTokens";
import { $CombinedState, combineReducers } from "redux";
import themeReducer from "@popup/theme/Theme.reducer";
const rootReducers = combineReducers({
  test,
  account,
  themeReducer,
  followTokens,
});

export type RootState = ReturnType<typeof rootReducers> & {
  readonly [$CombinedState]?: undefined;
};

export default rootReducers;
