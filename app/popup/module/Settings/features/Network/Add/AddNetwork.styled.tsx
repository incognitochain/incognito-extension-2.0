import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled from "styled-components";

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-top: 30px;
`;

const TextInputWraper = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const Label = styled.p`
  width: 100%;
  margin-top: 24px;
  text-align: left;
`;

export { PrimaryButtonContaniner, TextInputWraper, Label };
