import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { reset } from "redux-form";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { selectedPrivacyNativeToken, selectedPrivacyToken } from "@redux/selectedPrivacy/selectedPrivacy.selectors";
import { defaultAccountSelector } from "@redux/account/account.selectors";
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
  const account = useSelector(defaultAccountSelector);
  const { amount: prvAmount, pDecimals: prvPDecimals } = useSelector(selectedPrivacyNativeToken);
  const tokenAmount: number = selectedPrivacy?.amount;

  const isInitingForm = !selectedPrivacy || !send.init || !init;

  const initData = async () => {
    if (init) return;

    console.log("SANG TEST::: ", { prvAmount, selectedPrivacy });
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
  };

  React.useEffect(() => {
    initData().then();
  }, []);

  return <WrappedComp {...{ ...props, isInitingForm }} />;
};

export default enhanceInit;
