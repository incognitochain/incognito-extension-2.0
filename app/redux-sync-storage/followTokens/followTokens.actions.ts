import { FollowTokenActionType, SelectedPrivacy } from "./followTokens.types";

const setFollowToken = (followTokenList: SelectedPrivacy[]) => ({
  type: FollowTokenActionType.SET,
  payload: {
    followTokenList,
  },
});

export { setFollowToken };
