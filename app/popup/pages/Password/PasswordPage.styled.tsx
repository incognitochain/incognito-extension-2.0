import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled from "styled-components";

const PasswordLabel = styled.p`
  width: 100%;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 8px;
`;

const VerifyLabel = styled.p`
  width: 100%;
  text-align: left;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const DescriptionText = styled.p`
  margin-top: 24px;
`;

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-top: 120px;
  margin-bottom: 10px;
`;

export { PrimaryButtonContaniner, DescriptionText, PasswordLabel, VerifyLabel };
