import React from "react";
import enhance, { IHistory } from "@module/TokenDetail/features/TxsHistory";
import { TInner } from "@module/TokenDetail/features/TxsHistory/TxsHistory.enhance";
import styled, { ITheme } from "styled-components";
import { Row } from "@popup/theme";
import { useHistory } from "react-router-dom";
import { route as routeTxHistoryDetail } from "@module/TokenDetail/features/TxHistoryDetail/TxHistoryDetail.route";

export interface IMergeProps extends TInner {}

const Styled = styled(Row)`
  justify-content: space-between;
  margin-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP10};
  .sub-text {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
    margin-top: 4px;
  }
`;

const MainStyled = styled.div`
  padding-top: 16px;
`;

const HistoryItem = React.memo(({ history }: { history: IHistory }) => {
  const navHistory = useHistory();
  const onClick = () => navHistory.push(routeTxHistoryDetail, { history });

  return (
    <Styled className="default-padding-horizontal hover" onClick={onClick}>
      <div>
        <p className="fs-medium noselect">{history.txTypeStr}</p>
        <p className="fs-small sub-text noselect">{history.timeStr}</p>
      </div>
      <div>
        <p className="fs-medium text-align-right noselect">{history.amountStr}</p>
        <p className="fs-small text-align-right sub-text noselect" style={{ color: history.statusColor }}>
          {history.statusStr}
        </p>
      </div>
    </Styled>
  );
});

const TxsHistory = React.memo((props: IMergeProps & any) => {
  const { history } = props;

  const renderItem = (history: IHistory) => <HistoryItem history={history} key={history.txID} />;

  return <MainStyled>{history.map(renderItem)}</MainStyled>;
});

export default enhance(TxsHistory);
