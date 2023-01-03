import React, { memo } from "react";
import styled, { ITheme } from "styled-components";

const Styled = styled.div``;

type Props = {
  width?: number | string;
  height?: number | string;
  color?: string | any;
};

const BreakLine = (props: Props) => {
  return <Styled />;
};
export default BreakLine;
