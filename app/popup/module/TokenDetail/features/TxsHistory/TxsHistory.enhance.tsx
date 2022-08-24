import React from "react";
import { useSelector } from "react-redux";
import { defaultAccountWalletSelector } from "@redux/account/account.selectors";
import { selectedPrivacyToken } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.selectors";
import debounce from "lodash/debounce";
import { IHistoryFromSDK, IHistory } from "@module/TokenDetail/features/TxsHistory/TxsHistory.interfaces";
import { getTxsHistoryBuilder } from "@module/TokenDetail/features/TxsHistory/TxsHistory.utils";
import { colorsSelector } from "@popup/theme";
const { PrivacyVersion } = require("incognito-chain-web-js/build/web/wallet");

export interface TInner {
  handleLoadHistory: () => any;
  history: IHistory[];
}

const enhance = (WrappedComponent: React.FunctionComponent) =>
  React.forwardRef((props: any, ref: any) => {
    const accountSender = useSelector(defaultAccountWalletSelector);
    const selectedPrivacy = useSelector(selectedPrivacyToken);
    const [history, setHistory] = React.useState<IHistory[]>([]);
    const colors = useSelector(colorsSelector);
    const interval = React.useRef<any>(null);

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

    React.useImperativeHandle(ref, () => ({
      reloadHistory: () => {
        return handleLoadHistory();
      },
    }));

    React.useEffect(() => {
      if (interval.current) return;
      _debounceLoadHistory();
      interval.current = setInterval(() => {
        _debounceLoadHistory();
      }, 5000);
      return () => {
        clearInterval(interval.current);
        interval.current = null;
      };
    }, [selectedPrivacy.tokenId]);

    return <WrappedComponent {...{ ...props, handleLoadHistory: _debounceLoadHistory, history }} />;
  });

export default enhance;
