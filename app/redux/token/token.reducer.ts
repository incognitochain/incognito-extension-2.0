import { unionBy, remove } from "lodash";
// import { SelectedPrivacyActionType } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.type";
import { TokenActionType, TokenActions } from "@redux/token/token.types";
import { Reducer } from "redux";
import PTokenModel from "@model/pTokenModel";

export const LIMIT_RECEIVE_HISTORY_ITEM = 20;
export const MAX_LIMIT_RECEIVE_HISTORY_ITEM = 50;

export interface TokenState {
  followed: any[];
  pTokens: PTokenModel[];
  internalTokens: any[];
  isGettingBalance: any[];
  history: {
    isFetching: boolean;
    isFetched: boolean;
    histories: any[];
    isEmpty: boolean;
    refreshing: boolean;
  };
  toggleUnVerified: boolean;
  receiveHistory: {
    isFetching: boolean;
    isFetched: boolean;
    data: any[];
    oversize: boolean;
    page: number;
    limit: number;
    refreshing: boolean;
    tokenId: string | null;
    notEnoughData: boolean;
  };
}

const initialState: TokenState = {
  followed: [],
  pTokens: [],
  internalTokens: [],
  isGettingBalance: [],
  history: {
    isFetching: false,
    isFetched: false,
    histories: [],
    isEmpty: false,
    refreshing: true,
  },
  toggleUnVerified: false,
  receiveHistory: {
    isFetching: false,
    isFetched: false,
    data: [],
    oversize: false,
    page: 0,
    limit: LIMIT_RECEIVE_HISTORY_ITEM,
    refreshing: true,
    tokenId: null,
    notEnoughData: false,
  },
};

const setToken = (list: any, token: any) => {
  let newList = [...list];
  try {
    const foundIndex = list.findIndex((t: any) => t.id === token.id);
    if (foundIndex >= 0) {
      newList[foundIndex] = { ...newList[foundIndex], ...token };
    } else {
      newList.push(token);
    }
  } catch (e) {
    throw new Error("Save token failed");
  }
  return newList;
};

const removeTokenById = (list: any, tokenId: any) => {
  let newList = [...list];
  try {
    newList = remove(newList, (t) => t.id === tokenId);
  } catch (e) {
    throw new Error("Remove token failed");
  }
  return newList;
};

const setBulkToken = (list: any, tokens: any) => {
  let newList = [...list];
  try {
    newList = unionBy(tokens, list, "id");
  } catch (e) {
    throw new Error("Save tokens failed");
  }
  return newList;
};

const setListToken = (list: any, tokens: any) => {
  const newTokens = tokens?.map((token: any) => {
    const cachedToken = list?.find((t: any) => t.id === token.id);

    // if cached token (in redux store) has its amount, keep it!
    if (cachedToken?.amount) {
      token.amount = cachedToken.amount;
    }
    return token;
  });

  return newTokens;
};

const setGettingBalance = (list: any, tokenSymbol: any) => {
  const newList = [...list];
  return newList.includes(tokenSymbol) ? newList : [...newList, tokenSymbol];
};

const removeGettingBalance = (list: any, tokenSymbol: any) => {
  const newList = [...list];
  remove(newList, (item) => item === tokenSymbol);
  return newList;
};

export const reducer: Reducer<TokenState, TokenActions> = (state = initialState, action: TokenActions): TokenState => {
  let newList = [];

  switch (action.type) {
    case TokenActionType.SET:
      newList = setToken(state.followed, action.payload);
      return {
        ...state,
        followed: newList,
      };
    case TokenActionType.SET_BULK:
      newList = setBulkToken(state.followed, action.payload);
      return {
        ...state,
        followed: newList,
      };
    case TokenActionType.GET_BALANCE:
      return {
        ...state,
        isGettingBalance: setGettingBalance(state.isGettingBalance, action.payload),
      };
    case TokenActionType.GET_BALANCE_FINISH:
      return {
        ...state,
        isGettingBalance: removeGettingBalance(state.isGettingBalance, action.payload),
      };
    case TokenActionType.REMOVE_BY_ID:
      newList = removeTokenById(state.followed, action.payload);
      return {
        ...state,
        followed: newList,
      };
    case TokenActionType.SET_LIST:
      newList = setListToken(state.followed, action.payload);
      return {
        ...state,
        followed: newList,
      };
    case TokenActionType.SET_PTOKEN_LIST:
      return {
        ...state,
        pTokens: setListToken(state.followed, action.payload),
      };
    case TokenActionType.SET_INTERNAL_LIST:
      return {
        ...state,
        internalTokens: [],
      };
    case TokenActionType.ACTION_FETCHING_HISTORY: {
      return {
        ...state,
        history: {
          ...state.history,
          isFetching: true,
          refreshing: action?.payload?.refreshing || false,
        },
      };
    }
    case TokenActionType.ACTION_FETCHED_HISTORY: {
      return {
        ...state,
        history: {
          ...state.history,
          isFetching: false,
          isFetched: true,
          histories: [...action.payload],
          isEmpty: action.payload.length === 0,
          refreshing: false,
        },
      };
    }
    case TokenActionType.ACTION_FETCH_FAIL_HISTORY: {
      return {
        ...state,
        history: {
          ...state.history,
          isFetching: false,
          isFetched: false,
          refreshing: false,
        },
      };
    }
    case TokenActionType.ACTION_FREE_HISTORY: {
      return {
        ...state,
        history: { ...initialState.history },
      };
    }
    case TokenActionType.ACTION_TOGGLE_UNVERIFIED_TOKEN: {
      return {
        ...state,
        toggleUnVerified: !state.toggleUnVerified,
      };
    }
    //
    case TokenActionType.ACTION_FREE_RECEIVE_HISTORY: {
      return {
        ...state,
        receiveHistory: {
          ...initialState?.receiveHistory,
        },
      };
    }
    case TokenActionType.ACTION_FETCHING_RECEIVE_HISTORY: {
      return {
        ...state,
        receiveHistory: {
          ...state.receiveHistory,
          isFetching: true,
          refreshing: action?.payload?.refreshing || false,
          notEnoughData: false,
        },
      };
    }
    case TokenActionType.ACTION_FETCHED_RECEIVE_HISTORY: {
      const { nextPage, data, oversize, refreshing, notEnoughData } = action?.payload;
      return {
        ...state,
        receiveHistory: {
          ...state.receiveHistory,
          isFetching: false,
          isFetched: true,
          data: [...data],
          page: refreshing ? state?.receiveHistory?.page : nextPage,
          oversize,
          refreshing: false,
          notEnoughData,
        },
      };
    }
    case TokenActionType.ACTION_FETCH_FAIL_RECEIVE_HISTORY: {
      return {
        ...state,
        receiveHistory: {
          ...state.receiveHistory,
          isFetching: false,
          isFetched: false,
          refreshing: false,
          notEnoughData: false,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
