import React, { FunctionComponent } from "react";
import { TInner } from "@module/AddToken/AddToken.types";
import { getTokensInfo } from "@services/api/token";
import debounce from "lodash/debounce";
import first from "lodash/first";
import { createLogger } from "@core/utils";
import PTokenModel from "@model/pTokenModel";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "@redux/store";
import { actionAddFollowToken } from "@redux/token";
import { useLoading } from "@popup/context/loading";
import { useHistory } from "react-router-dom";
import { followsTokenAssetsSelector } from "@module/Assets";

const log = createLogger("incognito:import-token");

const withImportToken = (WrappedComponent: FunctionComponent & any) => {
  return (props: any) => {
    const dispatch: AppThunkDispatch = useDispatch();
    const followed = useSelector(followsTokenAssetsSelector);
    const { showLoading } = useLoading();
    const history = useHistory();
    const [{ tokenID, network, symbol, error, contractID, name, pDecimals }, setState] = React.useState<TInner>({});

    const getTokenInfo = async ({ tokenID }: { tokenID: string }) => {
      try {
        if (!tokenID) return;
        const isExist = followed.some(({ id }) => id.toLowerCase() === tokenID);
        if (isExist) {
          return setState((value) => ({ ...value, error: "Token have been added before" }));
        }
        const tokens: PTokenModel[] = await getTokensInfo({ tokenIDs: [tokenID] });
        const token = first(tokens);
        if (!token) {
          return setState((value) => ({ ...value, error: "Can not find your tokenID" }));
        }
        setState((value) => ({
          ...value,
          tokenID,
          contractID: token.contractId,
          network: token.network,
          symbol: token.symbol,
          name: token.name,
          pDecimals: token.pDecimals,
          error: undefined,
        }));
      } catch (error) {
        setState((value) => ({ ...value, error: error.message }));
        log("ERROR: ", error);
      }
    };

    const _handleDetectToken = React.useCallback(debounce(getTokenInfo, 500), [
      tokenID,
      network,
      symbol,
      error,
      contractID,
    ]);

    const onChangeTokenID = (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;
      setState((value) => ({ ...value, tokenID: text }));
      _handleDetectToken({ tokenID: text });
    };

    const onAddToken = async () => {
      if (!tokenID) return;
      try {
        showLoading({
          value: true,
        });
        await dispatch(actionAddFollowToken({ tokenID })).then();
        history.goBack();
      } catch (e) {
        // Error
      } finally {
        showLoading({
          value: false,
        });
      }
    };

    return (
      <WrappedComponent
        {...{
          ...props,
          tokenID,
          network,
          symbol,
          name,
          error,
          contractID,
          pDecimals,
          onChangeTokenID,
          onAddToken,
        }}
      />
    );
  };
};

export default withImportToken;
