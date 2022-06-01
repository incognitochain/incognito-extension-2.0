import { getPTokenList } from "@redux/token";
import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "@redux/store";
import { compose } from "recompose";
import { useHistory } from "react-router-dom";
import { actionToggleModal } from "@module/Modal";
import { isFirstTimeScanCoinsSelector } from "@redux/scanCoins";
import LoadingContainer from "@components/LoadingContainer";
import styled, { ITheme } from "styled-components";
import { otaKeyOfDefaultAccountSelector } from "@redux/account/account.selectors";

const LoadingScanCoins = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }: { theme: ITheme }) => theme.content};
  display: flex;
  flex-direction: column;
`;

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
    const OTAKey = useSelector(otaKeyOfDefaultAccountSelector);
    return (
      <>
        <WrappedComponent {...props} />
        {isScanCoins && OTAKey && (
          <LoadingScanCoins>
            <LoadingContainer message="It looks like your first time scan UTXOs. Please wait, it can take 10 minutes." />
          </LoadingScanCoins>
        )}
      </>
    );
  };
};
export default compose(withPToken, withRouteChange, withLoading);
