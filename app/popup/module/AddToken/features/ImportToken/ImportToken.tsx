import React from "react";
import styled, { ITheme } from "styled-components";
import Header from "@components/Header";
import WrapContent from "@components/Content";
import enhance from "./ImportToken.enhance";
import { IHistoryItem } from "@module/TokenDetail/features/HistoryItem";
import HistoryItem from "@module/TokenDetail/features/HistoryItem/HistoryItem";
import SelectedPrivacyModel from "@model/SelectedPrivacyModel";
import PTokenModel from "@model/pTokenModel";
import { Button } from "@components/Core";
import { useSelector } from "react-redux";
import { followsTokenAssetsSelector } from "@module/Assets";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useHistory } from "react-router-dom";

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
  .btn-add-token {
    margin-top: 15px;
  }
`;

interface IProps {
  infosFactories: IHistoryItem[];
  isVerified: boolean;
  selectedPrivacy: PTokenModel;
}

const ImportToken = React.memo(({ infosFactories, isVerified, selectedPrivacy }: IProps & any) => {
  const followed = useSelector(followsTokenAssetsSelector);
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();
  const history = useHistory();

  const isDisabled = React.useMemo(() => {
    return followed.some(({ id }) => id === selectedPrivacy.tokenId);
  }, [followed, selectedPrivacy]);

  const handleImportToken = async () => {
    try {
      showLoading({
        value: true,
      });

      await callAsync(request("popup_addNewFollowToken", { tokenID: selectedPrivacy.tokenId }), {
        onSuccess: (result: any) => {},
        onError: (error) => {
          console.log("onAddToken ERROR: ", error);
        },
        onFinish: () => {
          showLoading({ value: false });
          console.log("onAddToken FINISH: ");
          history.goBack();
        },
      });
    } catch (e) {
      console.log("onAddToken ERROR: ");
    }
  };

  return (
    <Styled isVerified={isVerified}>
      <Header title="Coin Info" />
      <WrapContent className="default-padding-top default-padding-horizontal">
        <p className="name-text fs-supermedium fw-bold fs-medium">{selectedPrivacy.symbol}</p>
        <p className="fs-regular">{`${selectedPrivacy.symbol} (${
          selectedPrivacy.network ? selectedPrivacy.network : "Incognito"
        })`}</p>
        <p className="verify fw-medium fs-medium">{isVerified ? "Verified" : "Unverified"}</p>
        {infosFactories.map((item: IHistoryItem) => (
          <HistoryItem key={item.title} {...item} />
        ))}

        <Button
          disabled={isDisabled}
          title={`${isDisabled ? "Token Added" : "Import Token"}`}
          className="btn-add-token"
          onClick={handleImportToken}
        />
      </WrapContent>
    </Styled>
  );
});

export default enhance(ImportToken);
