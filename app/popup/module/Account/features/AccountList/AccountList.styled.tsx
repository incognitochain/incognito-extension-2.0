import styled, { ITheme } from "styled-components";
import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";

const Container = styled.div``;
const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  position: absolute;
  left: 24px;
  right: 24px;
  height: 50px;
  width: auto;
  bottom: 10px;
`;

export { Container, PrimaryButtonContaniner, PrimaryButtonStyled };
