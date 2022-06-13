import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import { selectedPrivacyToken } from "@redux/selectedPrivacy";
import WrapContent from "@components/Content/Content";
import { ArrowCircleIcon } from "@components/Icons";
import { Extra, ActionsGroup } from "@module/TokenDetail/features";
import { useHistory } from "react-router-dom";
import { route as routeWallet } from "@module/Assets/Assets.route";
import withHistory, { TxsHistory } from "@module/TokenDetail/features/TxsHistory";
import { compose } from "recompose";
import { withBalance } from "@module/MainRoute/MainRoute.enhance";

const Styled = styled.div`
  height: 100%;
  .wrap-content {
    flex-direction: column;
  }
`;

const TokenDetail = React.memo((props: any) => {
  const { loadFollowTokensBalance, handleLoadHistory } = props;
  const tokenSelected = useSelector(selectedPrivacyToken);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const onReload = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      await Promise.all([loadFollowTokensBalance(), handleLoadHistory()]);
    } catch (e) {
      // Ignore Error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled>
      <Header
        onGoBack={() => history.push(routeWallet)}
        rightHeader={<ArrowCircleIcon className="hover" onClick={onReload} isLoading={isLoading} />}
        title={tokenSelected.symbol}
      />
      <WrapContent>
        <Extra />
        <ActionsGroup />
        <TxsHistory />
      </WrapContent>
    </Styled>
  );
});

export default compose(withBalance, withHistory)(TokenDetail);
