import React, { memo } from "react";
import styled, { ITheme } from "styled-components";

const Styled = styled.div``;

type Props = {
  width?: number;
  height?: number;
};

const SpaceView = React.memo((props: Props) => {
  const { width = 0, height = 0 } = props;
  return <Styled style={{ width, height }} />;
});

export default memo(SpaceView);
