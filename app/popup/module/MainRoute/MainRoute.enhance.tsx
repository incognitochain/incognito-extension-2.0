import { getPTokenList } from "@redux/token";
import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "@redux/store";
import { compose } from "recompose";
import { useHistory } from "react-router-dom";
import { actionToggleModal } from "@module/Modal";
import { isFirstTimeScanCoinsSelector } from "@redux/scanCoins";
import { otaKeyOfDefaultAccountSelector } from "@redux/account/account.selectors";
import { useBackground } from "@popup/context/background";
import throttle from "lodash/throttle";
import { Loading } from "@popup/context/loading";

const withBackgroundState = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    const { popupState } = useBackground();
    if (!popupState) return null;
    return <WrappedComponent {...props} />;
  };
};

const withPToken = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    const dispatch: AppThunkDispatch = useDispatch();

    const getTokensList = () => dispatch(getPTokenList());

    React.useEffect(() => {
      getTokensList().then();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

const withRouteChange = (WrappedComponent: any) => {
  return (props: any) => {
    const dispatch: AppThunkDispatch = useDispatch();
    const history = useHistory();
    const handleClose = () => dispatch(actionToggleModal({}));
    React.useEffect(() => {
      const listener = history.listen(() => {
        handleClose();
      });
      return () => {
        listener();
      };
    }, []);
    return <WrappedComponent {...props} />;
  };
};

const withLoading = (WrappedComponent: any) => {
  return (props: any) => {
    const isScanCoins = useSelector(isFirstTimeScanCoinsSelector);
    return (
      <>
        <WrappedComponent {...props} />
        {isScanCoins && <Loading message="Scanning coins, please wait a few minutes" />}
      </>
    );
  };
};

export const withBalance = (WrappedComponent: FunctionComponent) => (props: any) => {
  const { request, popupState } = useBackground();
  const OTAKey = useSelector(otaKeyOfDefaultAccountSelector);
  const loadFollowTokensBalance = throttle(() => request("popup_followTokensBalance", {}), 1000);
  const walletState = popupState?.walletState;
  const interval = React.useRef<any>(null);

  React.useEffect(() => {
    if (!walletState || !OTAKey || walletState !== "unlocked" || interval.current) return;
    loadFollowTokensBalance();
    interval.current = setInterval(() => {
      loadFollowTokensBalance();
    }, 20000);
    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  }, [OTAKey, walletState]);

  return <WrappedComponent {...{ ...props, loadFollowTokensBalance }} />;
};

export default compose(withBackgroundState, withPToken, withRouteChange, withLoading, withBalance);
