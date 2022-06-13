import React from "react";
import { useSelector } from "react-redux";
import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";
import debounce from "lodash/debounce";
import { IHistoryFromSDK, IHistory } from "@module/TokenDetail/features/TxsHistory/TxsHistory.interfaces";
import { getTxsHistoryBuilder } from "@module/TokenDetail/features/TxsHistory/TxsHistory.utils";
import { colorsSelector } from "@popup/theme";
const { PrivacyVersion } = require("incognito-chain-web-js/build/web/wallet");

export interface TInner {
  handleLoadHistory: () => any;
  history: IHistory[];
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const accountSender = useSelector(defaultAccountWalletSelector);
  const selectedPrivacy = useSelector(selectedPrivacyToken);
  const [history, setHistory] = React.useState<IHistory[]>([]);
  const colors = useSelector(colorsSelector);

  const handleLoadHistory = async () => {
    const { txsTransactor }: { txsTransactor: IHistoryFromSDK[] } = await accountSender.getTxsHistory({
      tokenID: selectedPrivacy.tokenId,
      isPToken: false,
      version: PrivacyVersion.ver3,
    });
    const history = getTxsHistoryBuilder({ txsHistory: txsTransactor, selectedPrivacy, colors });
    setHistory(history);
  };

  const _debounceLoadHistory = debounce(React.useCallback(handleLoadHistory, [selectedPrivacy.tokenId]), 200);

  React.useEffect(() => {
    _debounceLoadHistory();
  }, [selectedPrivacy.tokenId]);

  return <WrappedComponent {...{ ...props, handleLoadHistory: _debounceLoadHistory, history }} />;
};

export default enhance;
