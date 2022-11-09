import React, { FunctionComponent } from "react";
import { TInner } from "@module/AddToken/AddToken.types";
import debounce from "lodash/debounce";
import { createLogger } from "@core/utils";
import PTokenModel from "@model/pTokenModel";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPTokenList } from "@redux-sync-storage/followTokens/followTokens.selectors";
import orderBy from "lodash/orderBy";
import { route } from "@module/AddToken/features/ImportToken";

const log = createLogger("incognito:import-token");

const withImportToken = (WrappedComponent: FunctionComponent & any) => {
  return (props: any) => {
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
        const _tokens = orderBy(
          pTokens.filter((token) => {
            return (
              (token.name && token.name.toLowerCase().includes(searchText.toLowerCase())) ||
              (token.symbol && token.symbol.toLowerCase().includes(searchText.toLowerCase())) ||
              // (token.network && token.network.toLowerCase().includes(searchText.toLowerCase())) ||
              (searchText.length > 10
                ? token.contractId && token.contractId.toLowerCase().includes(searchText.toLowerCase())
                : false) ||
              (searchText.length > 10
                ? token.tokenId && token.tokenId.toLowerCase().includes(searchText.toLowerCase())
                : false)
            );
          }) || [],
          ["isUnified", "verified"],
          ["desc", "desc"],
        );
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

    const onAddToken = async () => {};

    const selectToken = (token: PTokenModel) => {
      history.push({
        pathname: route,
        state: { data: token },
      });
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
          selectToken,
        }}
      />
    );
  };
};

export default withImportToken;
