import { AnyAction } from "redux";
import { RootState } from "@redux/reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import store from "./store";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppGetState = () => RootState;

export default store;
