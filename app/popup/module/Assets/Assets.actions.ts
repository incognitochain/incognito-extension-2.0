import { AssetsActionType } from "@module/Assets/Assets.constant";
import { AssetsFetchingAction, AssetsFetchingPayload } from "@module/Assets/Assets.types";
import { AppGetState, AppThunkDispatch } from "@redux/store";
import { createLogger } from "@core/utils";
import { trim } from "lodash";

const log = createLogger("assets:actions");

const actionFetchingBalance = (payload: AssetsFetchingPayload): AssetsFetchingAction => ({
  type: AssetsActionType.FETCHING,
  payload,
});

const actionGetFollowTokensBalance = async (dispatch: AppThunkDispatch, getState: AppGetState) => {
  try {
    // callAsync(request("popup_switchAccount", { accountName: trim(accountName) }), {
    //   progress: { message: "Switching Account..." },
    //   success: { message: "Switch Done" },
    //   onSuccess: (result) => {
    //     // history.goBack();
    //     console.log("Swtich Account Done: TO DO ");
    //   },
    // });
    //
  } catch (error) {
    log("LOAD FOLLOW TOKENS BALANCE WITH ERROR: ", error);
  }
};

export { actionGetFollowTokensBalance };
