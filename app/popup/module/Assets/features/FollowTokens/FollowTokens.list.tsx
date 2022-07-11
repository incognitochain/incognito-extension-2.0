import React from "react";
import { MainStyled } from "@module/Assets/Assets.styled";
import WrapContent from "@components/Content/Content";
import { FollowTokenItem } from "@module/Assets/features";
import { useSelector } from "react-redux";
import sharedSelectors from "@redux/shared/shared.selectors";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import Loading from "@components/Icons/Loading";

const FollowTokensList = React.memo(() => {
  const followTokens = useSelector(sharedSelectors.followTokensFormatedSelector);
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
