import React, { FunctionComponent } from "react";
import { useBackground } from "@popup/context/background";
import { useSelector } from "react-redux";
import { otaKeyOfDefaultAccountSelector } from "@redux/account/account.selectors";
import debounce from "lodash/debounce";
import { isFirstTimeScanCoinsSelector } from "@redux/scanCoins";

const withBalance = (WrappedComponent: FunctionComponent) => (props: any) => {
  const { request, popupState } = useBackground();
  const OTAKey = useSelector(otaKeyOfDefaultAccountSelector);
  const loadFollowTokensBalance = debounce(() => request("popup_followTokensBalance", {}), 1000);
  const walletState = popupState?.walletState;
  const interval = React.useRef<any>(null);
  const isScanCoins = useSelector(isFirstTimeScanCoinsSelector);

  React.useEffect(() => {
    if (!walletState || !OTAKey || walletState !== "unlocked" || interval.current || isScanCoins) return;
    loadFollowTokensBalance();
    interval.current = setInterval(() => {
      loadFollowTokensBalance();
    }, 5000);
    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  }, [OTAKey, walletState, isScanCoins]);

  return <WrappedComponent {...{ ...props, loadFollowTokensBalance }} />;
};

export default withBalance;
