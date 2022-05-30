import React from "react";
import { MainStyled } from "@module/Assets/Assets.styled";
import WrapContent from "@components/Content/Content";
import { FollowTokenItem } from "@module/Assets/features";
import { IToken } from "@module/Assets/features/FollowTokens/FollowTokens.token";
import { useSelector } from "react-redux";
import { followsTokenAssetsSelector } from "@module/Assets";

const FollowTokensList = React.memo(() => {
  const followTokens = useSelector(followsTokenAssetsSelector);

  return (
    <WrapContent>
      <MainStyled className="scroll-view">
        {followTokens.map((item: IToken, index: number) => (
          <FollowTokenItem {...item} index={index} key={item.id} />
        ))}
      </MainStyled>
    </WrapContent>
  );
});

export default FollowTokensList;
