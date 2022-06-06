import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { reset } from "redux-form";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { selectedPrivacyToken } from "@redux/selectedPrivacy/selectedPrivacy.selectors";
import { sendSelector } from "@module/Send/Send.selector";
import { FORM_CONFIGS } from "./Send.constant";
import { AppThunkDispatch } from "@redux/store";

export interface TInnerInit {
  isInitingForm: boolean;
}

const enhanceInit = (WrappedComp: React.FunctionComponent) => (props: any) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const [init, setInit] = React.useState(false);
  const selectedPrivacy: SelectedPrivacy = useSelector(selectedPrivacyToken);
  const send = useSelector(sendSelector);
  const isInitingForm = !selectedPrivacy || !send.init || !init;

  const initData = React.useCallback(async () => {
    if (init) return;
    try {
      setInit(false);
      batch(() => {
        dispatch(reset(FORM_CONFIGS.formName));
      });
    } catch (error) {
      console.log("INIT DATA ERROR: ", error);
    } finally {
      setInit(true);
    }
  }, []);

  React.useEffect(() => {
    initData().then();
  }, []);

  return <WrappedComp {...{ ...props, isInitingForm }} />;
};

export default enhanceInit;
