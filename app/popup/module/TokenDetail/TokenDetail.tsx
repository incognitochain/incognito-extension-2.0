import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";
import WrapContent from "@components/Content/Content";
import { ArrowCircleIcon, AskIcon } from "@components/Icons";
import { Extra, ActionsGroup } from "@module/TokenDetail/features";
import { useHistory } from "react-router-dom";
import { route as routeWallet } from "@module/Assets/Assets.route";
import { TxsHistory } from "@module/TokenDetail/features/TxsHistory";
import { compose } from "recompose";
import withBalance from "@module/MainRoute/MainRoute.withBalance";
import { sleep } from "@popup/utils/utils";
import { route } from "@module/TokenDetail/features/TokenInfo";

const Styled = styled.div`
  height: 100%;
  .wrap-content {
    flex-direction: column;
  }
`;

const TokenDetail = React.memo((props: any) => {
  const { loadFollowTokensBalance } = props;
  const tokenSelected = useSelector(selectedPrivacyToken);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const historyRef = React.useRef<any>(null);

  const onReload = async () => {
    try {
      if (isLoading || !historyRef.current) return;
      setIsLoading(true);
      await Promise.all([loadFollowTokensBalance(), historyRef.current.reloadHistory(), sleep(1000)]);
    } catch (e) {
      // Ignore Error
    } finally {
      setIsLoading(false);
    }
  };

  const navTokenInfo = () => history.push(route);

  return (
    <Styled>
      <Header
        onGoBack={() => history.push(routeWallet)}
        customHeader={<AskIcon onClick={navTokenInfo} />}
        rightHeader={<ArrowCircleIcon className="hover" onClick={onReload} isLoading={isLoading} />}
        title={tokenSelected.symbol}
      />
      <WrapContent>
        <Extra />
        <ActionsGroup />
        <TxsHistory ref={historyRef} />
      </WrapContent>
    </Styled>
  );
});

export default compose(withBalance)(TokenDetail);
