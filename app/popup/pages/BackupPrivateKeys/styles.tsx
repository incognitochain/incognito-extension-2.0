import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 8px;
  .margin {
    margin: 20px;
    margin-bottom: 10px;
  }

  .padding-bottom {
    padding-bottom: 85px;
  }
`;
const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  width: auto;
  flex: 1;
`;
export { Container, PrimaryButtonContaniner };
