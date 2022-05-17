import { createSelector } from "reselect";
import groupBy from "lodash/groupBy";
import { flatMap } from "lodash";
import { RootState } from "@redux/reducers";

// const masterKeyReducerSelector = createSelector(
//   (state: RootState) => state.cartReducer,
//   (cartReducer) => cartReducer,
// );
