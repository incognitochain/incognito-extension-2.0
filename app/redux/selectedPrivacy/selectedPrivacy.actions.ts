import {
  SelectedPrivacyActionType,
  SelectedPrivacySetPayload,
  SelectedPrivacySetAction,
  SelectedPrivacyClearAction,
} from "@redux/selectedPrivacy";

const actionSelectedPrivacySet = (payload: SelectedPrivacySetPayload): SelectedPrivacySetAction => ({
  type: SelectedPrivacyActionType.SET,
  payload,
});

const actionSelectedPrivacyClear = (): SelectedPrivacyClearAction => ({
  type: SelectedPrivacyActionType.CLEAR,
});

export { actionSelectedPrivacySet, actionSelectedPrivacyClear };
