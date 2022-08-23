import { FollowTokenActionType, SelectedPrivacy, SetPTokenListAction } from "./followTokens.types";
import PTokenModel from "@model/pTokenModel";

const setFollowToken = (followTokenList: SelectedPrivacy[]) => ({
  type: FollowTokenActionType.SET,
  payload: {
    followTokenList,
  },
});

const setPToken = (pTokens: PTokenModel[]): SetPTokenListAction => ({
  type: FollowTokenActionType.SET_PTOKEN,
  payload: {
    pTokens,
  },
});

export { setFollowToken, setPToken };
