import React from "react";
import { useSelector } from "react-redux";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { selectedPrivacyToken } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.selectors";
import { sendSelector } from "@module/Send/Send.selector";

export interface TInnerInit {
  isInitingForm: boolean;
}

const enhanceInit = (WrappedComp: React.FunctionComponent) => (props: any) => {
  const [init, setInit] = React.useState(false);
  const selectedPrivacy: SelectedPrivacy = useSelector(selectedPrivacyToken);
  const send = useSelector(sendSelector);
  const isInitingForm = !selectedPrivacy || !send.init || !init;

  const initData = React.useCallback(async () => {
    if (init) return;
    try {
      setInit(false);
    } catch (error) {
      console.log("INIT DATA ERROR: ", error);
    } finally {
      setTimeout(() => {
        setInit(true);
      }, 1000);
    }
  }, []);

  React.useEffect(() => {
    initData().then();
  }, []);

  return <WrappedComp {...{ ...props, isInitingForm }} />;
};

export default enhanceInit;
