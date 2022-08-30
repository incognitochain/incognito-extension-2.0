import React from "react";
import styled, { ITheme } from "styled-components";
import { Row } from "@popup/theme";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@redux/store";
import { actionSelectedPrivacySet } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.actions";
import { useHistory } from "react-router-dom";
import { route as routeTokenDetail } from "@module/TokenDetail";
import { Image } from "@components/Core";

const Styled = styled(Row)`
  height: 74px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP10};
  :hover {
    background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
    .network {
      background-color: ${({ theme }: { theme: ITheme }) => theme.content};
    }
  }
  .logo {
    width: 40px;
    height: 40px;
    margin-right: 14px;
  }
  .wrap-content {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  .desc-text {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  }
  .network {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
    padding-left: 4px;
    padding-right: 4px;
    margin-left: 6px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
    border-radius: 4px;
  }
`;

const Token = React.memo((props: SelectedPrivacy) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { symbol, shortName, network, formatAmount, formatBalanceByUsd, iconUrl, tokenId: tokenID } = props;

  const onTokenClick = React.useCallback(() => {
    dispatch(actionSelectedPrivacySet({ tokenID }));
    history.push(routeTokenDetail);
    setTimeout(() => {
      dispatch(actionSelectedPrivacySet({ tokenID }));
    }, 400);
    setTimeout(() => {
      dispatch(actionSelectedPrivacySet({ tokenID }));
    }, 1500);
  }, [tokenID]);

  if (!symbol) return null;

  return (
    <Styled className="default-padding-horizontal" onClick={onTokenClick}>
      <Image className="logo noselect" iconUrl={iconUrl} alt="logo-icon" />
      <Row className="wrap-content">
        <div>
          <p className="fs-medium noselect">{symbol}</p>
          <Row className="center">
            <p className="desc-text fs-small noselect">{shortName}</p>
            {!!network && (
              <div className="network">
                <p className="desc-text fs-supersmall noselect">{network}</p>
              </div>
            )}
          </Row>
        </div>
        <div>
          <p className="fs-medium text-align-right noselect">{`$${formatBalanceByUsd}`}</p>
          <p className="text-align-right desc-text fs-small noselect">{`${formatAmount} ${symbol}`}</p>
        </div>
      </Row>
    </Styled>
  );
});

export default Token;
