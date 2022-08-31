import React, { FunctionComponent } from "react";
import { useBackground } from "@popup/context/background";
import { useDispatch, useSelector } from "react-redux";
// import { otaKeyOfDefaultAccountSelector } from "@redux/account/account.selectors";
import { getKeyDefineAccountSelector, getOTAKeySelector } from "@redux-sync-storage/account/account.selectors";
import debounce from "lodash/debounce";
import { isFirstTimeScanCoinsSelector } from "@redux-sync-storage/scanCoins";
import { actionFetchingFollowBalance } from "@module/Assets/Assets.actions";

const withBalance = (WrappedComponent: FunctionComponent) => (props: any) => {
  const { request, popupState } = useBackground();
  const OTAKey = useSelector(getOTAKeySelector);
  const dispatch = useDispatch();
  const keyDefine = useSelector(getKeyDefineAccountSelector);
  const loadFollowTokensBalance = debounce(() => request("popup_followTokensBalance", {}), 1000);
  const walletState = popupState?.walletState;
  const interval = React.useRef<any>(null);
  const isScanCoins = useSelector(isFirstTimeScanCoinsSelector)(popupState);

  React.useEffect(() => {
    if (!walletState || !keyDefine || walletState !== "unlocked" || interval.current || isScanCoins) return;
    dispatch(actionFetchingFollowBalance({ isFetching: false }));
    loadFollowTokensBalance();
    interval.current = setInterval(() => {
      loadFollowTokensBalance();
    }, 10000);
    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  }, [OTAKey, walletState, isScanCoins]);

  return <WrappedComponent {...{ ...props, loadFollowTokensBalance }} />;
};

export default withBalance;
