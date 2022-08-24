import React, { useState, useEffect } from "react";
import { MainStyled } from "@module/Assets/Assets.styled";
import WrapContent from "@components/Content/Content";
import { FollowTokenItem } from "@module/Assets/features";
import { useSelector } from "react-redux";
import sharedSelectors from "@redux-sync-storage/shared/shared.selectors";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import Loading from "@components/Icons/Loading";
import { useBackground } from "@popup/context/background";
// import { useCallAsync } from "@popup/utils/notifications";

const FollowTokensList = React.memo(() => {
  const { request } = useBackground();
  // const callAsync = useCallAsync();
  const followTokens = useSelector(sharedSelectors.followTokensFormatedSelector);
  const getFollowTokens = async () => {
    request("popup_getFollowTokenList", {}).then();
  };
  useEffect(() => {
    getFollowTokens();
  }, []);

  return (
    <MainStyled>
      <WrapContent>
        {followTokens && followTokens.length > 0 ? (
          followTokens.map((item: SelectedPrivacy) => <FollowTokenItem {...item} key={item.tokenId} />)
        ) : (
          <Loading />
        )}
      </WrapContent>
    </MainStyled>
  );
});

export default FollowTokensList;
