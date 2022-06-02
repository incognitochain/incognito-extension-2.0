import React, { FunctionComponent } from "react";
import { TInner } from "@module/ImportToken/ImportToken.types";
import { getTokensInfo } from "@services/api/token";
import debounce from "lodash/debounce";
import first from "lodash/first";
import { createLogger } from "@core/utils";
import PTokenModel from "@model/pTokenModel";

const log = createLogger("incognito:import-token");

const withImportToken = (WrappedComponent: FunctionComponent & any) => {
  return (props: any) => {
    const [{ tokenID, network, symbol, error, contractID, name }, setState] = React.useState<TInner>({});

    const getTokenInfo = async ({ tokenID }: { tokenID: string }) => {
      try {
        if (!tokenID) return;
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
          onChangeTokenID,
        }}
      />
    );
  };
};

export default withImportToken;
