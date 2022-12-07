import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 8px;

  .margin {
    margin: 20px;
  }

  .rowButton {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 15px;
    margin-bottom: 40px;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .buttonCopy {
      display: flex;
      flex: 1;
      margin-left: 15px;
      margin-right: 15px;
    }
  }
`;
const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-left: 5px;
`;
export { Container, PrimaryButtonContaniner };
