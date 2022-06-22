import React from "react";
import styled, { ITheme } from "styled-components";
import Header from "@components/Header";
import WrapContent from "@components/Content";
import enhance from "./TokenInfo.enhance";
import { IHistoryItem } from "@module/TokenDetail/features/HistoryItem";
import HistoryItem from "@module/TokenDetail/features/HistoryItem/HistoryItem";
import SelectedPrivacyModel from "@model/SelectedPrivacyModel";

const Styled = styled.div<{ isVerified: boolean }>`
  .verify {
    color: ${({ theme, isVerified }: { theme: ITheme; isVerified: boolean }) =>
      isVerified ? theme.colorP2 : theme.colorP1};
    margin-bottom: 16px;
    margin-top: 16px;
  }
  .name-text {
    margin-bottom: 6px;
  }
`;

interface IProps {
  infosFactories: IHistoryItem[];
  isVerified: boolean;
  selectedPrivacy: SelectedPrivacyModel;
}

const TokenInfo = React.memo(({ infosFactories, isVerified, selectedPrivacy }: IProps & any) => {
  return (
    <Styled isVerified={isVerified}>
      <Header title="Coin Info" />
      <WrapContent className="default-padding-top default-padding-horizontal">
        <p className="name-text fs-supermedium fw-bold fs-medium">{selectedPrivacy.shortName}</p>
        <p className="fs-regular">{`${selectedPrivacy.symbol} (${
          selectedPrivacy.network ? selectedPrivacy.network : "Incognito"
        })`}</p>
        <p className="verify fw-medium fs-medium">{isVerified ? "Verified" : "Unverified"}</p>
        {infosFactories.map((item: IHistoryItem) => (
          <HistoryItem key={item.title} {...item} />
        ))}
      </WrapContent>
    </Styled>
  );
});

export default enhance(TokenInfo);
