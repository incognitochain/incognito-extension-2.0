import {
  SelectedPrivacyActionType,
  SelectedPrivacySetPayload,
  SelectedPrivacySetAction,
  SelectedPrivacyClearAction,
} from "../selectedPrivacy/selectedPrivacy.types";

const actionSelectedPrivacySet = (payload: SelectedPrivacySetPayload): SelectedPrivacySetAction => ({
  type: SelectedPrivacyActionType.SET,
  payload,
});

const actionSelectedPrivacyClear = (): SelectedPrivacyClearAction => ({
  type: SelectedPrivacyActionType.CLEAR,
});

export { actionSelectedPrivacySet, actionSelectedPrivacyClear };
