import React from "react";
import { useSelector } from "react-redux";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { selectedPrivacyToken } from "@redux/selectedPrivacy/selectedPrivacy.selectors";
import { ISignTransactionData } from "@module/SignTransaction/SignTransaction.types";
import { signDataSelector } from "@module/SignTransaction/SignTransaction.selector";

export interface TInnerInit {
  isInitingForm: boolean;
}

const enhanceInit = (WrappedComp: React.FunctionComponent) => (props: any) => {
  const [init, setInit] = React.useState(false);
  const selectedPrivacy: SelectedPrivacy = useSelector(selectedPrivacyToken);
  const isInitingForm = !selectedPrivacy || !init;
  const signData: ISignTransactionData = useSelector(signDataSelector);

  const initData = React.useCallback(async () => {
    if (init) return;
    try {
      setInit(false);
    } catch (error) {
      console.log("INIT DATA ERROR: ", error);
    } finally {
      setTimeout(() => {
        setInit(true);
      }, 300);
    }
  }, []);

  React.useEffect(() => {
    initData().then();
  }, []);

  return <WrappedComp {...{ ...props, isInitingForm, ...signData }} />;
};

export default enhanceInit;
