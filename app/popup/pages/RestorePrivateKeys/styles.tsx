import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled, { ITheme } from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 8px;

  .override-color {
    background: ${({ theme }: { theme: ITheme }) => theme.content};
  }

  .margin {
    margin: 20px;
    margin-bottom: 10px;
  }

  .padding-bottom {
    padding-bottom: 85px;
  }
`;

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-left: 5px;
`;
export { Container, PrimaryButtonContaniner };
