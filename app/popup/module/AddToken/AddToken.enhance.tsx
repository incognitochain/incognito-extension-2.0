import React, { FunctionComponent } from "react";
import { TInner } from "@module/AddToken/AddToken.types";
import { getTokensInfo } from "@services/api/token";
import debounce from "lodash/debounce";
import first from "lodash/first";
import { createLogger } from "@core/utils";
import PTokenModel from "@model/pTokenModel";
import { useSelector } from "react-redux";
import { useLoading } from "@popup/context/loading";
import { useHistory } from "react-router-dom";
import { followsTokenAssetsSelector } from "@module/Assets/Assets.selector";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";
import axios from "axios";
import { getPTokenList } from "@redux-sync-storage/followTokens/followTokens.selectors";

const log = createLogger("incognito:import-token");

const withImportToken = (WrappedComponent: FunctionComponent & any) => {
  return (props: any) => {
    const followed = useSelector(followsTokenAssetsSelector);
    const callAsync = useCallAsync();
    const { request } = useBackground();
    const { showLoading } = useLoading();
    const history = useHistory();
    const pTokens = useSelector(getPTokenList);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [{ searchText }, setState] = React.useState<TInner>({});
    const [tokens, setTokens] = React.useState<PTokenModel[]>([]);

    const searchToken = async () => {
      try {
        if (!searchText) return;
        const _tokens = pTokens.filter((token) => {
          return (
            (token.name && token.name.toLowerCase().includes(searchText.toLowerCase())) ||
            (token.symbol && token.symbol.toLowerCase().includes(searchText.toLowerCase())) ||
            (token.network && token.network.toLowerCase().includes(searchText.toLowerCase())) ||
            (token.contractId && token.contractId.toLowerCase().includes(searchText.toLowerCase())) ||
            (token.tokenId && token.tokenId.toLowerCase().includes(searchText.toLowerCase()))
          );
        });
        setTokens(_tokens || []);
        if (_tokens && _tokens.length > 0) {
          handleOpen();
        }
      } catch (error) {
        log("ERROR: ", error);
      }
    };

    const _handleSearchToken = React.useCallback(debounce(searchToken, 100), [searchText]);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;
      setState((value) => ({ ...value, searchText: text }));
    };

    const onAddToken = async () => {
      // if (!searchText) return;
      // try {
      //   showLoading({
      //     value: true,
      //   });
      //
      //   await callAsync(request("popup_addNewFollowToken", { tokenID }), {
      //     onSuccess: (result: any) => {},
      //     onError: (error) => {
      //       console.log("onAddToken ERROR: ", error);
      //     },
      //     onFinish: () => {
      //       showLoading({ value: false });
      //       console.log("onAddToken FINISH: ");
      //       history.goBack();
      //     },
      //   });
      // } catch (e) {
      //   console.log("onAddToken ERROR: ");
      // }
    };

    return (
      <WrappedComponent
        {...{
          ...props,
          searchText,
          tokens,
          onChangeInput,
          onAddToken,
          searchToken: _handleSearchToken,
          open,
          handleOpen,
          handleClose,
        }}
      />
    );
  };
};

export default withImportToken;
