import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 8px;

  .margin {
    margin: 20px;
  }

  .rowButton {
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    flex: 1;
  }
`;

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-left: 5px;
`;
export { Container, PrimaryButtonContaniner };
