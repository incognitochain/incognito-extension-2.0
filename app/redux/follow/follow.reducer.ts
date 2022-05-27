import { Reducer } from "react";
import { FollowActions, FollowActionType } from "./follow.types";

export interface FollowState {
  isFetching: boolean;
  data: any;
}

const initialState: FollowState = {
  isFetching: false,
  data: {},
};

const setToken = ({ OTAKey, token, data }: any) => {
  let newList = [...(data[OTAKey] || [])];
  const foundIndex = newList.findIndex((t) => t.id === token.id);
  if (foundIndex >= 0) {
    newList[foundIndex] = { ...newList[foundIndex], ...token };
  }
  return newList;
};

export const reducer: Reducer<FollowState, FollowActions> = (
  state = initialState,
  action: FollowActions,
): FollowState => {
  switch (action.type) {
    case FollowActionType.ACTION_FETCHING_BALANCE: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case FollowActionType.ACTION_FETCHED_BALANCE: {
      const { balance, OTAKey } = action.payload;
      return {
        ...state,
        isFetching: false,
        data: Object.assign(state.data, { [OTAKey]: balance }),
      };
    }
    case FollowActionType.ACTION_UPDATE_TOKEN_LIST: {
      const { newTokens, OTAKey } = action.payload;
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          [OTAKey]: newTokens,
        },
      };
    }
    case FollowActionType.ACTION_FETCHED_TOKEN_BALANCE: {
      const { token, OTAKey } = action.payload;
      const newList = setToken({ OTAKey, token, data: state.data });
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          [OTAKey]: newList,
        },
      };
    }
    default:
      return state;
  }
};
