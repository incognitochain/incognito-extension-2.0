import { getPTokenList } from "@redux/token";
import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "@redux/store";
import { compose } from "recompose";
import { useHistory } from "react-router-dom";
import { useModal } from "@module/Modal";
import { isFirstTimeScanCoinsSelector, isShowConfirmScanCoins } from "@redux/scanCoins";
import { otaKeyOfDefaultAccountSelector } from "@redux/account/account.selectors";
import { useBackground } from "@popup/context/background";
import throttle from "lodash/throttle";
import { Loading, useLoading } from "@popup/context/loading";
import BoxScanCoin from "@components/BoxScanCoin";
import { actionUpdateNetwork, networkSelector } from "@popup/configs";
import serverService, { MAINNET_FULLNODE } from "@services/wallet/Server";

const withBackgroundState = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    const { popupState } = useBackground();
    if (!popupState) return null;
    return <WrappedComponent {...props} />;
  };
};

const withInit = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    const dispatch: AppThunkDispatch = useDispatch();
    const { showLoading } = useLoading();
    const [init, setInit] = React.useState(false);
    const updateNetwork = async () => {
      showLoading({ value: true });
      const server = (await serverService.getDefault()) || {};
      dispatch(actionUpdateNetwork({ network: server.address || MAINNET_FULLNODE }));

      setTimeout(() => {
        showLoading({ value: false });
        setInit(true);
      }, 500);
    };

    React.useEffect(() => {
      updateNetwork();
    }, []);

    if (!init) return null;
    return <WrappedComponent {...props} />;
  };
};

const withPToken = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    const dispatch: AppThunkDispatch = useDispatch();
    const network = useSelector(networkSelector);

    const getTokensList = () => dispatch(getPTokenList());

    React.useEffect(() => {
      getTokensList().then();
    }, [network]);

    return <WrappedComponent {...props} />;
  };
};

const withRouteChange = (WrappedComponent: any) => {
  return (props: any) => {
    const history = useHistory();
    React.useEffect(() => {
      const listener = history.listen(() => {});
      return () => {
        listener();
      };
    }, []);
    return <WrappedComponent {...props} />;
  };
};

const withLoading = (WrappedComponent: any) => {
  return (props: any) => {
    const { setModal } = useModal();
    const isScanCoins = useSelector(isFirstTimeScanCoinsSelector);
    const showConfirmScanCoins = useSelector(isShowConfirmScanCoins);

    React.useEffect(() => {
      if (showConfirmScanCoins) {
        setModal({
          data: <BoxScanCoin />,
          title: "",
          isTransparent: true,
          closable: false,
        });
      }
    }, [showConfirmScanCoins]);

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
  const isScanCoins = useSelector(isFirstTimeScanCoinsSelector);

  React.useEffect(() => {
    if (!walletState || !OTAKey || walletState !== "unlocked" || interval.current || isScanCoins) return;
    loadFollowTokensBalance();
    interval.current = setInterval(() => {
      loadFollowTokensBalance();
    }, 20000);
    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  }, [OTAKey, walletState, isScanCoins]);

  return <WrappedComponent {...{ ...props, loadFollowTokensBalance }} />;
};

export default compose(withBackgroundState, withInit, withPToken, withRouteChange, withLoading, withBalance);
