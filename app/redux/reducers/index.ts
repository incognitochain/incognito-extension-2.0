import { combineReducers } from "redux";

import app from "@redux/reducers/app";
import { reducer as masterKeyReducer } from "@redux/masterKey/masterKey.reducer";

const rootReducers = combineReducers({
  app,
  masterKeyReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;
